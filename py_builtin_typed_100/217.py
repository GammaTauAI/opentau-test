import typing
from typing import *

class Solution(object):
    def addDigits(self, num : Any) -> Any:
        """
        :type num: int
        :rtype: int
        """
        # https: // en.wikipedia.org / wiki / Digital_root
        if num < 10:
            return num
        return num - ((num - 1) / 9) * 9

