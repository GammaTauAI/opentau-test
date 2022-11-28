class PriorityQueue {
    heap: number[];
    top: number;
    comparator: (a: number, b: number) => boolean;
    constructor(comparator = (a, b) => a > b) {
        this.heap = [];
        this.top = 0;
        this.comparator = comparator;
    }
    size(): number {
        return this.heap.length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    peek(): number {
        return this.heap[this.top];
    }
    push(...values: number[]): number {
        values.forEach((value) => {
            this.heap.push(value);
            this.siftUp();
        });
        return this.size();
    }
    pop(): number {
        const poppedValue: number = this.peek();
        const bottom: number = this.size() - 1;
        if (bottom > this.top) {
            this.swap(this.top, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }
    replace(value: number): number {
        const replacedValue: number = this.peek();
        this.heap[this.top] = value;
        this.siftDown();
        return replacedValue;
    }
    parent: (i: number) => number = (i) => ((i + 1) >>> 1) - 1;
    left: (i: number) => number = (i) => (i << 1) + 1;
    right: (i: number) => number = (i) => (i + 1) << 1;
    greater: (i: number, j: number) => boolean = (i, j) => this.comparator(this.heap[i], this.heap[j]);
    swap: (i: number, j: number) => void = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
    siftUp: () => void = () => {
        let node: number = this.size() - 1;
        while (node > this.top && this.greater(node, this.parent(node))) {
            this.swap(node, this.parent(node));
            node = this.parent(node);
        }
    };
    siftDown: () => void = () => {
        let node: number = this.top;
        while ((this.left(node) < this.size() && this.greater(this.left(node), node)) ||
            (this.right(node) < this.size() && this.greater(this.right(node), node))) {
            let maxChild: number = this.right(node) < this.size() &&
                this.greater(this.right(node), this.left(node))
                ? this.right(node)
                : this.left(node);
            this.swap(node, maxChild);
            node = maxChild;
        }
    };
}
const smallestRange: (nums: Int16Array[]) => number[] = function (nums) {
    const pq: any = new PriorityQueue((a, b) => a[0] < b[0]);
    const limit: number = 10 ** 5, n: number = nums.length, { max } = Math;
    let right: number = -1e5, res: number[] = [-limit, limit];
    for (let i: number = 0; i < n; i++) {
        pq.push([nums[i][0], i, 0]);
        right = max(right, nums[i][0]);
    }
    while (pq.size()) {
        const cur: any = pq.pop();
        const [left, list, indice] = cur;
        if (right - left < res[1] - res[0])
            res = [left, right];
        if (indice + 1 === nums[list].length)
            return res;
        right = max(right, nums[list][indice + 1]);
        pq.push([nums[list][indice + 1], list, indice + 1]);
    }
    return [];
};
