import typing
from typing import *

class Solution(object):
    # https://discuss.leetcode.com/topic/12997/11ms-c-solution-concise
    def __init__(self) -> None:
        self.solution = {}

    def wordBreak(self, s : Any, wordDict : Any) -> Any:
        """
        :type s: str
        :type wordDict: Set[str]
        :rtype: List[str]
        """
        try:
            return self.solution[s]
        except KeyError:
            pass
        result = []
        if s in wordDict:
            result.append(s)
        for i in range(1, len(s)):
            word = s[i:]
            if word in wordDict:
                rem = s[:i]
                prev = self.wordBreak(rem, wordDict)
                result.extend([res + ' ' + word for res in prev])
        self.solution[s] = result
        return result

