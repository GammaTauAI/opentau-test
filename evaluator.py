import os
import time
import sys
import threading
import json
import subprocess

from typing import Dict, List, Type, TypeVar

# TODO:
# - add incoder support
# - add built-in typescript type-inf support


if len(sys.argv) > 6 or len(sys.argv) < 5:
    print(
        f"USAGE: {sys.argv[0]} test-file-dir/ perm.json client.bin out/results.csv")
    sys.exit(1)

_TEST_DIR = sys.argv[1]
_PERM_JSON = sys.argv[2]
_CLIENT_PATH = sys.argv[3]
_RESULTS_PATH = sys.argv[4]
if len(sys.argv) == 6:
    _SAVE_DIR = sys.argv[5]
else:
    _SAVE_DIR = '/tmp/deleteme'
    # create the directory if it doesn't exist
    if not os.path.exists(_SAVE_DIR):
        os.makedirs(_SAVE_DIR)

_CODEX_TOKEN = os.environ['CODEX_TOKEN']
_CSV_HEADER = f'file,model,language,strategy,retries,num_comp,temp,status,quality\n'
_STOP_AT = 30  # we get a max of 30 type-checkable comps

if _CODEX_TOKEN is None:
    print("please set CODEX_TOKEN env var")
    sys.exit(1)


T = TypeVar('T', bound='Permutation')


class Permutation:
    def __init__(self, n: int, r: int, temp: float, strategy: str, model: str) -> None:
        assert model == 'codex' or model == 'incoder'
        self.n = n
        self.r = r
        self.temp = temp
        self.strategy = strategy
        self.model = model

    @classmethod
    def deserialize(cls: Type[T], s: Dict) -> T:
        return cls(**s)

    def __repr__(self):
        return f"Permutation(n={self.n}, r={self.r}, temp={self.temp}, strategy={self.strategy}, model={self.model})"


def run_with_timeout(cmd: List[str], timeout_sec: int) -> subprocess.Popen:
    # uses Popen to run a command with a timeout
    proc = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # poll every 0.25 seconds
    for _ in range(timeout_sec * 4):
        time.sleep(0.25)
        if proc.poll() is not None:
            return proc
    # kill the process
    proc.kill()
    return proc


def main() -> None:
    d = os.fsencode(_TEST_DIR)

    files = [os.fsdecode(f) for f in os.listdir(d)]

    with open(_PERM_JSON) as f:
        perms = [Permutation.deserialize(i) for i in json.load(f)]

    with open(_RESULTS_PATH, 'w') as write_file:
        write_file.write(_CSV_HEADER)
        iteration = 1
        max_iterations = len(files) * len(perms)
        for f in files:
            # get full path of file
            filepath = os.path.abspath(os.path.join(_TEST_DIR, f))
            lang = f.split(".")[-1]

            for i, p in enumerate(perms):
                dirname = f"{f}_perm_{i}"
                outdir = os.path.join(_SAVE_DIR, dirname)

                model_cmd = ""  # default is codex, do nothing extra
                if p.model == 'incoder':
                    # on incoder, we point to our http server
                    model_cmd = " --endpoint http://127.0.0.1:8000 --disable-rate-limit"

                print(
                    f"({iteration}/{max_iterations}): running {filepath} with {p.__repr__()}")
                cmd = f"{_CLIENT_PATH} -t {_CODEX_TOKEN} --file {filepath} --output {outdir} --lang {lang} --retries {p.r} --n {p.n} --temp {p.temp} --strategy {p.strategy} --stop-at {_STOP_AT}{model_cmd}"
                cmd_ = cmd.split()
                sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                status = sp.wait()

                out = sp.stdout.read().decode("utf-8")
                err = sp.stderr.read().decode("utf-8")

                if 'Rate limited' in err:
                    print(f"got rate limited. sleeping")
                    time.sleep(120)
                    sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                    status = sp.wait()
                    out = sp.stdout.read().decode("utf-8")
                    err = sp.stderr.read().decode("utf-8")
                    if 'Rate limited' in err:
                        print(f"got rate limited again!!!!")
                        time.sleep(120)

                quality = "NA"
                if status == 0:
                    comp = out.split("completed:\n")[-1]
                    print(f"got completion: {comp}")
                    print(f"status: {status}")
                    # we get the quality from the file names in the output dir

                    files = os.listdir(outdir)
                    # if we sort the files by name, the first one is the best
                    files.sort()
                    quality = files[0].split("_")[-1].split(".")[0]

                if status != 0:
                    # print stderr
                    print(f"stderr: {err}")
                    print(f"stdout: {out}")
                    print(f"status: {status}")

                status_str = "success" if status == 0 else "failure"
                row = f'{f},{p.model},{lang},{p.strategy},{p.r},{p.n},{p.temp},{status_str},{quality}\n'
                print(f"writing row: {row}")
                write_file.write(row)

                # remove all /tmp/codex-*-* files
                cmd = "rm -rf /tmp/codex-*-*"
                cmd_ = cmd.split()
                sp = subprocess.Popen(
                    cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                status = sp.wait()
                iteration += 1


if __name__ == '__main__':
    main()
