const getOrder: (tasks: [number, number, number][]) => number[] = function (tasks) {
    const pq: PriorityQueue = new PriorityQueue(compare), n: number = tasks.length;
    const res: number[] = [];
    let time: number = 0, i: number = 0;
    for (let i: number = 0; i < n; i++)
        tasks[i].push(i);
    tasks.sort((a, b) => a[0] - b[0]);
    time = tasks[0][0];
    while (i < n || !pq.isEmpty()) {
        while ((i < n) && (tasks[i][0] <= time)) {
            pq.push([tasks[i][1], tasks[i][2]]);
            i++;
        }
        if (!pq.isEmpty()) {
            const [dur, idx] = pq.pop();
            time += dur;
            res.push(idx);
        }
        else if (i < n) {
            time = tasks[i][0];
        }
    }
    return res;
};
function compare(a: number, b: number): boolean {
    if (a[0] < b[0])
        return true;
    else if (a[0] > b[0])
        return false;
    else {
        return a[1] < b[1];
    }
}
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
    peek(): any | undefined {
        return this.heap[this.top];
    }
    push(...values: any[]): number {
        values.forEach((value) => {
            this.heap.push(value);
            this.siftUp();
        });
        return this.size();
    }
    pop(): any | undefined {
        const poppedValue: any | undefined = this.peek();
        const bottom: number = this.size() - 1;
        if (bottom > this.top) {
            this.swap(this.top, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }
    replace(value: any | undefined): any | undefined {
        const replacedValue: any | undefined = this.peek();
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
