import os
from redbaron import RedBaron

from temp.check import check_completed

UNTYPED_DIR = './py_untyped_100_validated'
BUILTIN_TYPED_DIR = './py_builtin_typed_100'


def eval_builtin_completions(untyped_dir: str, typed_dir: str) -> None:
    d = os.fsencode(untyped_dir) 
    successes = 0
    c_score = 5
    for file in os.listdir(d):
        filename = os.fsdecode(file)
        if filename.endswith('.py'):
            # load code and ignore import nodes
            with open(os.path.join(untyped_dir, filename)) as f:
                untyped_ast = RedBaron(f.read()).find('ClassNode')
            with open(os.path.join(typed_dir, filename)) as f:
                typed_ast = RedBaron(f.read()).find('ClassNode')
            is_valid, score = check_completed(untyped_ast, typed_ast)
            print(f'file: {filename}\nis_valid: {is_valid}\nscore: {score}')
            if is_valid:
                successes += 1
                c_score += score
    assert successes > 0
    print(f'\nsuccessful files: {successes} (out of 100)\navg score: {round(c_score / successes, 2)}')
        

if __name__ == '__main__':
    eval_builtin_completions(UNTYPED_DIR, BUILTIN_TYPED_DIR)
