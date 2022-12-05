import builtins
from typing_extensions import reveal_type


class Solution:
    def add(
            self,
            a: builtins.int,
            b
        ):
        return a + b

    def sub(self, c, d):
        return c + d 

reveal_type(Solution.add)
reveal_type(Solution.sub)
