import builtins
from typing_extensions import reveal_type


def add(
        a: builtins.int,
        b
    ):
    return a + b

def sub(c, d):
    return c + d 

reveal_type(add)
reveal_type(sub)
