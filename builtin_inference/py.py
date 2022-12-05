import os
import json
import time
import random
import subprocess
from redbaron import RedBaron

from _utils import sendrecv_sock

from typing import Tuple, List


# TODO: implement
def _get_func_names(source_file: RedBaron) -> List[str]:
    print(source_file.find_all('DefNode'))
    return []

def _add_mypy_boilerplate(code: str, func_names: List[str]) -> str:
    out =  f"""from typing_extensions import reveal_type

*** MYPY BOILERPLATE START ***
{code}
*** MYPY BOILERPLATE END ***

"""
    for func_name in func_names: 
        out += f'reveal_type({func_name})'
    return out

def _remove_mypy_boilerplate(code: str) -> str:
    return code.split('*** MYPY BOILERPLATE START ***')[-1].split('*** BOILERPLATE END ***')[0]

def _partial_stub_to_ast(partial_stub: str, func_name: str) -> RedBaron:
    func_str = partial_stub.replace('def ', f'def {func_name}') + ':\npass'
    return RedBaron(func_str)
    
# TODO: implement
def _insert_func_stub(
        func: RedBaron,
        inferred_stub: RedBaron,
    ) -> str:
    return ''

# TODO: implement
def _insert_partial_stubs(code: str, partial_stubs: List[str]) -> str:
    return ''

def _get_partial_stubs_from_mypy(code: str) -> List[str]:
    tmp_f = f'/tmp/__mypy_bp{random.randint(0, 10000000)}.py'
    with open(tmp_f, 'w') as wf:
        wf.write(code)
    cmd = f'mypy --follow-imports=skip {tmp_f}'
    sp = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = sp.communicate()
    os.remove(tmp_f)
    if out:
        res: List[str] = out.decode('utf-8').split('\n')
        partial_stubs: List[str] = []
        for line in res:
            partial_stubs += [line.split('Revealed type is "')[-1][:-1]]
        return partial_stubs
    else:
        raise Exception(err.decode('utf-8'))
     

def builtin_python_infer(filename: str, client_path: str) -> Tuple[bool, str, int]:
    """
    runs the builtin type inference on the given python file,
    returns whether it was able to type check the file and
    the quality of the types it inferred. also returns the code
    that was inferred.
    """
    with open(filename, 'r') as rf:
        code = rf.read()
        source_file = RedBaron(code)
        func_names = _get_func_names(source_file)
        with_w_mypy_bp = _add_mypy_boilerplate(code, func_names)
        partial_stubs = _get_partial_stubs_from_mypy(with_w_mypy_bp)
        inferred_w_mypy_bp = _insert_partial_stubs(with_w_mypy_bp, partial_stubs)
        typeinf_code = _remove_mypy_boilerplate(inferred_w_mypy_bp)

        proj_path = '/'.join(client_path.split('/')[0:-2])
        py_ast_server_path = f'{proj_path}/ps-ast/main.py'
        this_pid = os.getpid()
        sock_path = f"/tmp/test-sock-{this_pid}.sock"

        if os.path.exists(sock_path):
            os.remove(sock_path)
        cmd = f"python main.py 8000 {sock_path} {this_pid}"
        proc = subprocess.Popen(
            cmd.split(), cwd=py_ast_server_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(3)

        req = {
            "cmd": "check",
            "text": typeinf_code,
            "original": typeinf_code,
        }

        res = json.loads(sendrecv_sock(
            sock_path, json.dumps(req).encode('utf-8')))
        did_complete = bool(res["text"])
        score = int(res["score"])

        if not did_complete:
            return did_complete, typeinf_code,  score

        # now we typecheck the code, also close the server
        proc.kill()

        tmp_dir_path = f"/tmp/builtin-typeinf-{this_pid}-{filename.split('/')[-1]}"

        with open(tmp_dir_path, 'w') as wf:
            wf.write(typeinf_code)
        cmd = f"mypy mypy --follow-imports=skip {tmp_dir_path}"
        proc = subprocess.Popen(
            cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, _ = proc.communicate()
        did_typecheck = 'Success' in out.decode('utf-8')
        return did_typecheck, typeinf_code, score


if __name__ == '__main__':
    with open('../temp.py', 'r') as f:
        code = f.read()
        _get_func_names(RedBaron(code)) 
