import os
import sys
import shutil
import subprocess

assert len(sys.argv) == 3
TEST_DIR = sys.argv[1]
WRITE_DIR = sys.argv[2]


def validate_py_files(read_dir: str, write_dir: str) -> None:
    d = os.fsencode(read_dir) 
    file_count = 0
    type_validated_file_count = 0
    for file in os.listdir(d):
        filename = os.fsdecode(file)
        if filename.endswith('.py'):
            cmd = f'mypy --follow-imports=skip {os.path.join(read_dir, filename)}' 
            sp = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            out, err = sp.communicate()
            if out:
                if 'Success' in out.decode('utf-8'):
                    type_validated_file_count += 1
                    shutil.copyfile(os.path.join(read_dir, filename), os.path.join(write_dir, f'{file_count}.py'))
                    file_count += 1
            else:
                raise Exception(err.decode('utf-8'))
    print(f'complete: copied {type_validated_file_count}/{file_count} files to {write_dir}')


if __name__ == '__main__':
    validate_py_files(TEST_DIR, WRITE_DIR)
