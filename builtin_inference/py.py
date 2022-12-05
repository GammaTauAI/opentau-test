import os
import json
import time
import inspect
import subprocess
from redbaron import RedBaron

from _utils import sendrecv_sock

from typing import Tuple, List


# TODO: implement
def _get_func_names(filename: str) -> List[str]:
    res = inspect.getmembers(filename)

# TODO: implement
def _format_pyright_cmd(func_names: List[str]) -> str:
    return ''

# TODO: implement
def _get_inferred_types(cmd: str) -> List[dict]:
    return []

# TODO: implement
def _insert_types(code: str, inf_types: List[dict]) -> str:
    return ''

def builtin_python_infer(filename: str, client_path: str) -> Tuple[bool, str, int]:
    """
    runs the builtin type inference on the given python file,
    returns whether it was able to type check the file and
    the quality of the types it inferred. also returns the code
    that was inferred.
    """
    with open(filename, 'r') as rf:
        code = rf.read()
        func_names = _get_func_names(filename)
        cmd = _format_pyright_cmd(func_names)
        inf_types = _get_inferred_types(cmd)
        typeinf_code = _insert_types(code, inf_types)

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
        cmd = f"pyright {tmp_dir_path}"
        sp = subprocess.Popen(
            cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _, _ = sp.communicate()
        did_typecheck = sp.returncode == 0
        return did_typecheck, typeinf_code, score


if __name__ == '__main__':
    with open('../temp.py', 'r') as f:
        code = f.read()
        _get_func_names(RedBaron(code)) 
