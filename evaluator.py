import os
import time
import sys
import json
import subprocess
import json

from permuation import Permutation
from builtin_inference import builtin_python_infer, builtin_typescript_infer

from typing import List

# TODO:
# - run tests with code with comments and without

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


# uses Popen to run a command with a timeout
def run_with_timeout(cmd: List[str], timeout_sec: int) -> subprocess.Popen:
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT, close_fds=True)
    try:
        proc.wait(timeout=timeout_sec)
    except subprocess.TimeoutExpired:
        proc.kill()
        proc.wait()
    return proc


def main() -> None:
    d = os.fsencode(_TEST_DIR)

    files = [os.fsdecode(f) for f in os.listdir(d)]

    with open(_PERM_JSON) as f:
        # this looks like:
        # {
        #  "iters": 5,
        #  "permutations": [
        #   ...
        #  ]
        # }
        j = json.load(f)
        perms = [Permutation.deserialize(i) for i in j['permutations']]
        iters = j['iters']

    for it in range(iters):
        # add the iter before the extension
        RESULTS_PATH = _RESULTS_PATH.replace('.csv', f'_iter_{it}.csv')
        print(
            f"#################### ITER ({it+1}/{iters}) ####################")
        with open(RESULTS_PATH, 'w') as write_file:
            write_file.write(_CSV_HEADER)
            iteration = 1
            max_iterations = len(files) * len(perms)
            for f in files:
                # get full path of file
                filepath = os.path.abspath(os.path.join(_TEST_DIR, f))
                lang = f.split(".")[-1]

                for p_i, p in enumerate(perms):
                    dirname = f"{f}_perm_{p_i}_iter_{it}"
                    outdir = os.path.join(_SAVE_DIR, dirname)
                    # create the directory
                    os.makedirs(outdir, exist_ok=True)

                    model_cmd = ""  # default is codex, do nothing extra
                    if p.model == 'incoder':
                        # on incoder, we point to our http server
                        model_cmd = " --endpoint http://127.0.0.1:8000 --disable-rate-limit --fallback"

                    print(
                        f"({iteration}/{max_iterations}): running {filepath} with {p.__repr__()}")

                    if p.model != "builtin":
                        cmd = f"{_CLIENT_PATH} -t {_CODEX_TOKEN} --file {filepath} --output {outdir} --lang {lang} --retries {p.r} --n {p.n} --temp {p.temp} --strategy {p.strategy} --stop-at {_STOP_AT}{model_cmd}"
                        cmd_ = cmd.split()
                        sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                        status = sp.returncode

                        assert not sp.stdout is None
                        out = sp.stdout.read().decode("utf-8")
                        if 'Rate limited' in out or 'rate limit' in out:
                            print(f"got rate limited. sleeping")
                            time.sleep(120)
                            sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                            status = sp.returncode
                            assert not sp.stdout is None
                            out = sp.stdout.read().decode("utf-8")
                            if 'Rate limited' in out or 'rate limit' in out:
                                print(f"got rate limited again!!!!")
                                time.sleep(120)
                    else:
                        if lang == "ts":
                            did_typecheck, output, score = builtin_typescript_infer(filepath, _CLIENT_PATH)
                            out = output
                            if did_typecheck:
                                status = 0
                                # write code to outdir
                                with open(f"{outdir}/0_score_{score}.ts", 'w') as out_f:
                                    out_f.write(output)
                            else:
                                status = 1

                        # elif lang == "py":
                            # did_typecheck, output, score = builtin_python_infer(filepath, _CLIENT_PATH)
                            # out = output
                            # if did_typecheck:
                                # status = 0
                                # # write code to outdir
                                # with open(f"{outdir}/0_score_{score}.py", 'w') as out_f:
                                    # out_f.write(output)
                            # else:
                                # status = 1
                        else:
                            assert False, f"lang {lang} not supported"

                    quality = "NA"
                    if status == 0:
                        comp = out.split("completed:\n")[-1]
                        print(f"got completion: {comp}")
                        print(f"status: {status}")
                        # we get the quality from the file names in the output dir

                        q_files = os.listdir(outdir)
                        # if we sort the files by name, the first one is the best
                        q_files.sort()
                        quality = q_files[0].split("_")[-1].split(".")[0]

                    if status != 0:
                        # print stderr
                        print(f"stdout: {out}")
                        print(f"status: {status}")

                    if status == 0:
                        status_str = "success"
                    elif status == -9:
                        status_str = "timeout"
                    else:
                        status_str = "failure"

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
