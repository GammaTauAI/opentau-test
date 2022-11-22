const lowBit: (_: number) => number = (x) => x & -x;
class FenwickTree {
    sum: number[];
    constructor(n) {
        if (n < 1)
            return;
        this.sum = Array(n + 1).fill(0);
    }
    update(i: number, delta: number): void {
        if (i < 1)
            return;
        while (i < this.sum.length) {
            this.sum[i] += delta;
            i += lowBit(i);
        }
    }
    query(i: number): number {
        if (i < 1)
            return 0;
        let sum: number = 0;
        while (i > 0) {
            sum += this.sum[i];
            i -= lowBit(i);
        }
        return sum;
    }
}
const createSortedArray: (instructions: number[]) => number = function (instructions) {
    let res: number = 0, n: number = instructions.length, mod: number = 10 ** 9 + 7;
    const bit: FenwickTree = new FenwickTree(10 ** 5);
    for (let i = 0; i < n; i++) {
        res =
            (res +
                Math.min(bit.query(instructions[i] - 1), i - bit.query(instructions[i]))) %
                mod;
        bit.update(instructions[i], 1);
    }
    return res;
};
