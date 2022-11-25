const minInterval: (intervals: number[][], queries: number[]) => number[] = function (intervals, queries) {
    const n: number = intervals.length;
    const m: number = queries.length;
    const sortedQueryIdx: number[] = [...Array(m).keys()].sort((a, b) => queries[a] - queries[b]);
    intervals.sort((a, b) => a[0] - b[0]); // sort by start & ascending
    const minHeap: BinaryHeap = new BinaryHeap((c, p) => c.size >= p.size);
    const res: number[] = Array(m).fill(0);
    let i: number = 0;
    for (const idx of sortedQueryIdx) {
        const query: number = queries[idx];
        while (i < n && intervals[i][0] <= query) {
            minHeap.push({
                size: intervals[i][1] - intervals[i][0] + 1,
                start: intervals[i][0],
                end: intervals[i][1],
            });
            i++;
        }
        while (!minHeap.isEmpty() && minHeap.peek().end < query) {
            minHeap.pop();
        }
        res[idx] = minHeap.isEmpty() ? -1 : minHeap.peek().size;
    }
    return res;
};
class BinaryHeap {
    content: any;
    compareFn: (c: any, p: any) => boolean;
    constructor(compareFn) {
        this.content = [];
        this.compareFn = compareFn; // Min-Heap: (c, p) => c > p
    }
    size(): number {
        return this.content.length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    peek(): any {
        return this.size() > 0 ? this.content[0] : null;
    }
    push(node: any): void {
        this.content.push(node);
        this._bubbleUp(this.content.length - 1);
    }
    pop(): any {
        if (this.content.length === 0)
            return null;
        const root: any = this.content[0];
        const last: any = this.content.pop();
        if (this.content.length > 0) {
            this.content[0] = last;
            this._sinkDown(0);
        }
        return root;
    }
    remove(node: any): void {
        const length: number = this.content.length;
        for (let i: number = 0; i < length; i++) {
            if (this.content[i] !== node)
                continue;
            const last: any = this.content.pop();
            if (i === length - 1)
                break;
            this.content[i] = last;
            this._bubbleUp(i);
            this._sinkDown(i);
            break;
        }
    }
    _bubbleUp(idx: number): void {
        const node: any = this.content[idx];
        while (idx > 0) {
            const parentIdx: number = Math.floor((idx + 1) / 2) - 1;
            const parent: any = this.content[parentIdx];
            if (this.compareFn(node, parent))
                break;
            this.content[parentIdx] = node;
            this.content[idx] = parent;
            idx = parentIdx;
        }
    }
    _sinkDown(idx: number): void {
        const node: any = this.content[idx];
        while (true) {
            const child2Idx: number = (idx + 1) * 2;
            const child1Idx: number = child2Idx - 1;
            let swapIdx: number = -1;
            if (child1Idx < this.content.length) {
                const child1: any = this.content[child1Idx];
                if (!this.compareFn(child1, node))
                    swapIdx = child1Idx;
            }
            if (child2Idx < this.content.length) {
                const child2: any = this.content[child2Idx];
                const compareNode: any = swapIdx === -1 ? node : this.content[child1Idx];
                if (!this.compareFn(child2, compareNode))
                    swapIdx = child2Idx;
            }
            if (swapIdx === -1)
                break;
            this.content[idx] = this.content[swapIdx];
            this.content[swapIdx] = node;
            idx = swapIdx;
        }
    }
}
