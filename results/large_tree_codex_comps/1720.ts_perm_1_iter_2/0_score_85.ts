const maxAverageRatio: (classes: number[][], extraStudents: number) => number = function (classes, extraStudents) {
    const pq: any = new PriorityQueue((a, b) => a.delta > b.delta);
    const n: number = classes.length;
    for (let e of classes) {
        pq.push({
            pass: e[0],
            total: e[1],
            ratio: e[0] / e[1],
            delta: (e[0] + 1) / (e[1] + 1) - e[0] / e[1],
        });
    }
    while (extraStudents) {
        const tmp: {
            pass: number;
            total: number;
            ratio: number;
            delta: number;
        } = pq.pop();
        tmp.pass++;
        tmp.total++;
        tmp.ratio = tmp.pass / tmp.total;
        tmp.delta = (tmp.pass + 1) / (tmp.total + 1) - tmp.ratio;
        pq.push(tmp);
        extraStudents--;
    }
    let res: number = 0;
    while (!pq.isEmpty()) {
        const tmp: {
            pass: number;
            total: number;
            ratio: number;
            delta: number;
        } = pq.pop();
        res += tmp.ratio;
    }
    return res / n;
};
class PriorityQueue {
    heap: any[];
    top: number;
    comparator: Function;
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
    parent: Function = (i) => ((i + 1) >>> 1) - 1;
    left: Function = (i) => (i << 1) + 1;
    right: Function = (i) => (i + 1) << 1;
    greater: Function = (i, j) => this.comparator(this.heap[i], this.heap[j]);
    swap: Function = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
    siftUp: Function = () => {
        let node: number = this.size() - 1;
        while (node > this.top && this.greater(node, this.parent(node))) {
            this.swap(node, this.parent(node));
            node = this.parent(node);
        }
    };
    siftDown: Function = () => {
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
