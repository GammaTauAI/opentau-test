class Solution(object):
    def numIslands2(self, m : Any, n : Any, positions : Any) -> typing.List[Any]:
        """
        :type m: int
        :type n: int
        :type positions: List[List[int]]
        :rtype: List[int]
        """
        # quick union find with weights
        ans = []
        islands = Union()
        for p in map(tuple, positions):
            islands.add(p)
            for dp in (0, 1), (0, -1), (1, 0), (-1, 0):
                q = (p[0] + dp[0], p[1] + dp[1])
                if q in islands.id:
                    islands.unite(p, q)
            ans += [islands.count]
        return ans

class Union(object):
    """
    quick union find with weights
    """
    def __init__(self) -> None:
        # use dic to reduce index operations
        self.id = {}
        self.sz = {}
        self.count = 0

    def add(self, p : Any) -> None:
        self.id[p] = p
        self.sz[p] = 1
        self.count += 1

    def root(self, i : Any) -> Any:
        while i != self.id[i]:
            self.id[i] = self.id[self.id[i]]
            i = self.id[i]
        return i

    def unite(self, p : Any, q : Any) -> None:
        i, j = self.root(p), self.root(q)
        if i == j:
            return
        if self.sz[i] > self.sz[j]:
            i, j = j, i
        self.id[i] = j
        self.sz[j] += self.sz[i]
        self.count -= 1
