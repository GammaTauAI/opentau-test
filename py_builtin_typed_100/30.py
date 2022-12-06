import typing
from typing import *

class Solution(object):
    def simplifyPath(self, path : Any) -> str:
        """
        :type path: str
        :rtype: str
        """
        result = []
        plist = path.split('/')
        for pos in plist:
            if pos:
                if pos == '..':
                    try:
                        # up one level
                        result.pop()
                    except:
                        # arrive top level
                        result = []
                elif pos != '.':
                    result.append(pos)
        return '/'+'/'.join(result)

