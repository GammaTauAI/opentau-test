from typing import Dict, Type, TypeVar

T = TypeVar('T', bound='Permutation')

class Permutation:
    def __init__(self, n: int, r: int, temp: float, strategy: str, model: str) -> None:
        assert model == 'codex' or model == 'incoder' or model == 'builtin'
        self.n = n
        self.r = r
        self.temp = temp
        self.strategy = strategy
        self.model = model

    @classmethod
    def deserialize(cls: Type[T], s: Dict) -> T:
        return cls(**s)

    def __repr__(self):
        return f"Permutation(n={self.n}, r={self.r}, temp={self.temp}, strategy={self.strategy}, model={self.model})"
