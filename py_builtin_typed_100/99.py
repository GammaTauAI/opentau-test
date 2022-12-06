import typing
from typing import *

class Solution:
    def countAndSay(self, n : Any) -> str:
        """
        :type n: int
        :rtype: str
        """
        if n == 1:
            return '1'
        x = '1'
        while n > 1:
            # each round, read itself
            x = self.count(x)
            n -= 1
        return x

    def count(self, x : Any) -> str:
        m = list(x)
        res = []
        m.append(None)
        i , j = 0 , 0
        while i < len(m) - 1:
            j += 1
            if m[j] != m[i]:
                # note j - i is the count of m[i]
                res += [j - i, m[i]]
                i = j
        return ''.join(str(s) for s in res)

