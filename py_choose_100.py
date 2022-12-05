import os
import sys
import shutil
import random

assert len(sys.argv) == 3
DIR = sys.argv[1]
WRITE_DIR = sys.argv[2]


def choose_100(read_dir: str, write_dir: str) -> None:
    num_files = len([name for name in os.listdir(read_dir) if os.path.isfile(os.path.join(read_dir, name))])
    file_idxs = random.sample(range(0, num_files), 100)
    for num in file_idxs:
        filename = f'{num}.py'
        shutil.copyfile(os.path.join(read_dir, filename), os.path.join(write_dir, filename))
    print(f'copied 100 random files to `{write_dir}`')


if __name__ == '__main__':
    choose_100(DIR, WRITE_DIR)
