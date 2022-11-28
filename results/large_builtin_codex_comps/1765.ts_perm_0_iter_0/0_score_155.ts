const maxComp: (a: any, b: any) => boolean = (a, b) => {
    return a[1] === b[1] ? b[0].localeCompare(a[0]) > 0 : a[1] > b[1];
};
const minComp: (a: any, b: any) => boolean = (a, b) => {
    return a[1] === b[1] ? a[0].localeCompare(b[0]) > 0 : a[1] < b[1];
};
const SORTracker: () => void = function () {
    // max
    this.pq = new PriorityQueue(maxComp);
    // min
    this.best = new PriorityQueue(minComp);
};
SORTracker.prototype.add = function (name, score) {
    this.pq.push([name, score]);
    while (!this.best.isEmpty() && maxComp(this.pq.peek(), this.best.peek())) {
        const a: any = this.best.pop(), b: any = this.pq.pop();
        this.best.push(b);
        this.pq.push(a);
    }
};
SORTracker.prototype.get = function () {
    const tmp: any = this.pq.pop();
    this.best.push(tmp);
    return tmp[0];
};
class PriorityQueue {
    heap: any;
    top: any;
    comparator: any;
    constructor(comparator = (a, b) => a > b) {
        this.heap = [];
        this.top = 0;
        this.comparator = comparator;
    }
    size(): any {
        return this.heap.length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    peek(): any {
        return this.heap[this.top];
    }
    push(...values: any[]): any {
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
    parent: (i: any) => number = (i) => ((i + 1) >>> 1) - 1;
    left: (i: any) => number = (i) => (i << 1) + 1;
    right: (i: any) => number = (i) => (i + 1) << 1;
    greater: (i: any, j: any) => any = (i, j) => this.comparator(this.heap[i], this.heap[j]);
    swap: (i: any, j: any) => [any, any] = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
    siftUp: () => void = () => {
        let node: any = this.size() - 1;
        while (node > this.top && this.greater(node, this.parent(node))) {
            this.swap(node, this.parent(node));
            node = this.parent(node);
        }
    };
    siftDown: () => void = () => {
        let node: any = this.top;
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
