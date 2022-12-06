import typing
from typing import *

class Solution(object):
    def hammingDistance(self, x : Any, y : Any) -> int:
        """
        :type x: int
        :type y: int
        :rtype: int
        """
        return bin(x ^ y).count('1')

