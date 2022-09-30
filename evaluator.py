import os
import time
import sys
import json
import subprocess

from typing import Dict, Type, TypeVar


if len(sys.argv) != 5 or len(sys.argv) != 6:
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

_CODEX_TOKEN = os.environ['OPENAI_API_KEY']
_CSV_HEADER = f'file,language,strategy,retries,num_comp,temp,status\n'

if _CODEX_TOKEN is None:
    print("please set OPENAI_API_KEY env var")
    sys.exit(1)


T = TypeVar('T', bound='Permutation')


class Permutation:
    def __init__(self, n: int, r: int, temp: float, strategy: str) -> None:
        self.n = n
        self.r = r
        self.temp = temp
        self.strategy = strategy

    @classmethod
    def deserialize(cls: Type[T], s: Dict) -> T:
        return cls(**s)

    def __repr__(self):
        return f"Permutation(n={self.n}, r={self.r}, temp={self.temp}, strategy={self.strategy})"


def main() -> None:
    d = os.fsencode(_TEST_DIR)

    files = [os.fsdecode(f) for f in os.listdir(d)]

    with open(_PERM_JSON) as f:
        perms = [Permutation.deserialize(i) for i in json.load(f)]

    with open(_RESULTS_PATH, 'w') as write_file:
        write_file.write(_CSV_HEADER)
        for f in files:
            # get full path of file
            filepath = os.path.abspath(os.path.join(_TEST_DIR, f))
            lang = f.split(".")[-1]
            for p in perms:
                print(f"running {filepath} with {p.__repr__()}")
                cmd = f"{_CLIENT_PATH} --token {_CODEX_TOKEN} --file {filepath} --output {_SAVE_DIR} --lang {lang} --retries {p.r} --n {p.n} --temp {p.temp} --strategy {p.strategy}"
                cmd_ = cmd.split()
                sp = subprocess.Popen(
                    cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                status = sp.wait()

                out = sp.stdout.read().decode("utf-8")
                err = sp.stdout.read().decode("utf-8")

                if 'Rate limited' in err:
                    print(f"got rate limited. sleeping")
                    time.sleep(70)
                    sp = subprocess.Popen(
                        cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    status = sp.wait()
                    out = sp.stdout.read().decode("utf-8")
                    err = sp.stdout.read().decode("utf-8")
                    if 'Rate limited' in err.decode("utf-8"):
                        print(f"got rate limited again!!!!")
                        time.sleep(70)

                if status == 0:
                    comp = out.split("completed:\n")[-1]
                    print(f"got completion: {comp}")
                    print(f"status: {status}")

                if status != 0:
                    # print stderr
                    print()

                row = f'{f},{lang},{p.strategy},{p.r},{p.n},{p.temp},{status}\n'
                write_file.write(row)


if __name__ == '__main__':
    main()
