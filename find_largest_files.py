# this program finds the files with the largest number of lines in a directory

import os
import sys

NUM_TO_KEEP = 20

# check that argv has at least 2 arguments, if not print usage and exit
if len(sys.argv) < 3:
    print("Usage: find_largest_files.py <dir> <save_dir>")
    sys.exit(1)


DIR = sys.argv[1]  # dir to get from
COPY_TO = sys.argv[2]  # dir to save to


def get_line_count(filename):
    with open(filename) as f:
        return len(f.readlines())


def main():
    files = []
    for root, dirs, filenames in os.walk(DIR):
        for filename in filenames:
            files.append(os.path.join(root, filename))

    files.sort(key=get_line_count, reverse=True)

    for filename in files[:NUM_TO_KEEP]:
        print(filename, get_line_count(filename))
        os.system("cp {} {}".format(filename, COPY_TO))

if __name__ == "__main__":
    main()
