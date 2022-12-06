import typing
from typing import *

class Solution(object):
    def anagramMappings(self, A : Any, B : Any) -> typing.List[int]:
        """
        :type A: List[int]
        :type B: List[int]
        :rtype: List[int]
        """
        val_index = {}
        ans = []
        for i, n in enumerate(B):
            val_index[n] = i
        for n in A:
            ans.append(val_index[n])
        return ans

