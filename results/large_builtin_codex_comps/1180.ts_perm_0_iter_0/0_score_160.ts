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
const assignTasks: (servers: any, tasks: any) => any[] = function (servers, tasks) {
    const freePQ: PriorityQueue = new PriorityQueue((a, b) => {
        if (a.w < b.w)
            return true;
        else if (a.w > b.w)
            return false;
        else {
            if (a.idx < b.idx)
                return true;
            return false;
        }
    });
    const runningPQ: PriorityQueue = new PriorityQueue((a, b) => {
        return a.end === b.end
            ? a.w === b.w
                ? a.idx < b.idx
                : a.w < b.w
            : a.end < b.end;
    });
    const res: any[] = [];
    for (let i: number = 0; i < servers.length; i++) {
        freePQ.push({
            w: servers[i],
            idx: i,
        });
    }
    for (let i: number = 0, n: any = tasks.length; i < n; i++) {
        const cur: any = tasks[i];
        while (runningPQ.size() && runningPQ.peek().end <= i) {
            const el: any = runningPQ.pop();
            freePQ.push({
                w: el.w,
                idx: el.idx,
            });
        }
        if (freePQ.isEmpty()) {
            const el: any = runningPQ.pop();
            res[i] = el.idx;
            el.end += cur;
            runningPQ.push(el);
        }
        else {
            const el: any = freePQ.pop();
            res[i] = el.idx;
            el.end = i + cur;
            runningPQ.push(el);
        }
    }
    return res;
};
