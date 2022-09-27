import os
import time
import sys
import csv
import json
import subprocess
from typing import Dict


if len(sys.argv) != 5:
    print(
        f"USAGE: {sys.argv[0]} test-file-dir/ perm.json client.bin out/results.csv")
    sys.exit(1)


_TEST_DIR = sys.argv[1]
_PERM_JSON = sys.argv[2]
_CLIENT_PATH = sys.argv[3]
_RESULTS_PATH = sys.argv[4]
_CODEX_TOKEN = os.environ['OPENAI_API_KEY']
_CSV_HEADER = f'file,language,strategy,retries,num_comp,temp,status\n'

if _CODEX_TOKEN is None:
    print("please set OPENAI_API_KEY env var")
    sys.exit(1)


class Permutation:
    def __init__(self, n: int, r: int, temp: float, strategy: str) -> None:
        self.n = n
        self.r = r
        self.temp = temp
        self.strategy = strategy

    @staticmethod
    def deserialize(s: Dict):
        return Permutation(**s)

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
            lang = f.split(".")[-1]
            for p in perms:
                print(f"running {f} with {p.__repr__()}")
                cmd = f"{_CLIENT_PATH} --token {_CODEX_TOKEN} --file {f} --output /tmp/deleteme --lang {lang} --retries {p.r} --n {p.n} --temp {p.temp} --strategy {p.strategy}"
                cmd_ = cmd.split()
                sp = subprocess.Popen(
                    cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                out, err = sp.communicate()

                if 'Rate limited' in err.decode("utf-8"):
                    print(f"got rate limited. sleeping")
                    time.sleep(70)
                    sp = subprocess.Popen(
                        cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    out, err = sp.communicate()
                    if 'Rate limited' in err.decode("utf-8"):
                        print(f"got rate limited again!!!!")
                        time.sleep(70)

                status = sp.returncode
                if status == 0:
                    comp = out.decode("utf-8").split("completed:\n")[-1]
                    print(f"got completion: {comp}")
                print(f"status: {status}")

                row = f'{f},{lang},{p.strategy},{p.r},{p.n},{p.temp},{status}\n'
                write_file.write(row)


if __name__ == '__main__':
    main()


# 1. get the path of the files to test from argv[1]

# 2. get all files at the path

# 3. get the path of the perm from argv[2]

# 4. read the perms in the path

# 5. for each file, for each perm, run it, store results
#    - you know if it typechecked, if there is a completed file at the output

# 6. output csv file nguage,strategy,retries,num_comp,result
