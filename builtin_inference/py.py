import json
import socket
import subprocess
from redbaron import RedBaron

from typing import Tuple, List


# TODO: implement
def _get_func_names(source_file: RedBaron) -> List[str]:
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

def _get_partial_stubs_from_mypy(filename: str) -> List[str]:
    cmd = f'mypy --follow-imports=skip {filename}'
    sp = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = sp.communicate()
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

    typeinf_code: str = ... # type: ignore

