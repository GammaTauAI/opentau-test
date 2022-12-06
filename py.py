import os
import json
import time
import random
import warnings
import subprocess
from redbaron import RedBaron

# from _utils import sendrecv_sock

from typing import Tuple, List, Dict

import socket

_WRITE_DIR = './py_builtin_typed_100'


def sendrecv_sock(sock, data) -> str:
    s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    s.connect(sock)
    s.sendall(data)

    data = s.recv(122880)  # reaaal bad way to do this
    res = data.decode('utf-8')
    s.close()
    return res

def _get_method_names(code: str) -> List[str]:
    red = RedBaron(code)
    method_names = []
    for c in red.find_all('ClassNode'):
        for method_node in c.find_all('DefNode'):
            method_names += [f'{c.name}.{method_node.name}']
    return method_names

def _mypy_check_temp_file() -> None:
    cmd = f'dmypy check ./temp.py'
    sp = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    _, _ = sp.communicate()
    assert sp.returncode == 0

def _get_inferred_types(code: str, method_names: List[str]) -> Dict[str, dict]:
    # tmp_modulename = f'_{random.randint(0, 1000000)}'
    tmp_modulename = 'temp'
    tmp_filename = f'{tmp_modulename}.py'
    with open(tmp_filename, 'w') as wf:
        wf.write(code)

    _mypy_check_temp_file()

    data = {}
    for method_name in method_names:
        cmd = f'dmypy suggest {tmp_modulename}.{method_name} --json'
        sp = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = sp.communicate()
        if out:
            res = out.decode('utf-8')
            data[method_name.split('.')[-1]] = json.loads(res)
        else:
            raise Exception(err.decode('utf-8'))

    # os.remove(tmp_filename)
    return data

def _insert_types(code: str, inf_types: Dict[str, dict]) -> str:
    print(inf_types)
    ast = RedBaron(code)
    class_nodes = ast.find_all('ClassNode')
    for c in class_nodes:
        for method_node in c.find_all('DefNode'):
            if not method_node.name in inf_types.keys():
                warnings.warn(f'{method_node.name} method found in ast but not in inferred type dictionary')
            sig = inf_types[method_node.name][0]['signature']
            method_node.return_annotation = sig['return_type']
            arg_node_idx = 0
            for arg_node in method_node.arguments:
                if arg_node.name.value != 'self':
                    arg_node.annotation = sig['arg_types'][arg_node_idx]
                    arg_node_idx += 1
    return ast.dumps()

def builtin_python_infer(filename: str, client_path: str) -> Tuple[bool, str, int]:
    """
    runs the builtin type inference on the given python file,
    returns whether it was able to type check the file and
    the quality of the types it inferred. also returns the code
    that was inferred.
    """
    with open(filename, 'r') as rf:
        code = rf.read()
        method_names = _get_method_names(code)
        inf_types = _get_inferred_types(code, method_names)
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


# horrible way to do this but it works for now
if __name__ == '__main__':
    DIR = './py_untyped_100_validated'
    dir_ = os.fsencode(DIR)
    skipped = 0
    for file in os.listdir(dir_):
        try:
            filename = os.fsdecode(file)
            if filename.endswith('.py'):
                with open(os.path.join(DIR, filename), 'r') as rf:
                    code = rf.read()
                with open('./temp.py', 'w') as wf:
                    wf.write(code)
                method_names = _get_method_names(code)
                inf_types = _get_inferred_types(code, method_names)
                typeinf_code = _insert_types(code, inf_types)
                print(typeinf_code)
                with open(os.path.join(_WRITE_DIR, filename), 'w') as f:
                    f.write(typeinf_code)
        except Exception:
            skipped += 1
            continue
    print(f'skipped {skipped} files')
