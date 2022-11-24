class BitSet {
    arr: Array<number>;
    constructor(n) {
        this.arr = Array(n).fill(0);
    }
    flip(idx: number): void {
        this.arr[idx] = this.arr[idx] === 0 ? 1 : 0;
    }
    get(idx: number): number {
        return this.arr[idx];
    }
}
const oddCells: (n: number, m: number, indices: Array<Array<number>>) => number = function (n, m, indices) {
    const oddRows: BitSet = new BitSet(n), oddCols: BitSet = new BitSet(m);
    let cntRow: number = 0, cntCol: number = 0;
    for (let idx of indices) {
        oddRows.flip(idx[0]);
        oddCols.flip(idx[1]);
        cntRow += oddRows.get(idx[0]) ? 1 : -1;
        cntCol += oddCols.get(idx[1]) ? 1 : -1;
    }
    return (m - cntCol) * cntRow + (n - cntRow) * cntCol;
};
