const findMaxValueOfEquation: (points: number[][], k: number) => number = function (points, k) {
    const pq: PriorityQueue = new PriorityQueue((a, b) => a[0] === b[0] ? a[1] < b[1] : b[0] < a[0]);
    let res: number = -Infinity;
    for (let point of points) {
        while (!pq.isEmpty() && point[0] - pq.peek()[1] > k) {
            pq.pop();
        }
        if (!pq.isEmpty()) {
            res = Math.max(res, pq.peek()[0] + point[0] + point[1]);
        }
        pq.push([point[1] - point[0], point[0]]);
    }
    return res;
};
class PriorityQueue {
    heap: any[];
    top: number;
    comparator: (a: any, b: any) => boolean;
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
    peek(): any {
        return this.heap[this.top];
    }
    push(...values: any[]): number {
        values.forEach((value) => {
            this.heap.push(value);
            this.siftUp();
        });
        return this.size();
    }
    pop(): any {
        const poppedValue: any = this.peek();
        const bottom: number = this.size() - 1;
        if (bottom > this.top) {
            this.swap(this.top, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }
    replace(value: any): any {
        const replacedValue: any = this.peek();
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
