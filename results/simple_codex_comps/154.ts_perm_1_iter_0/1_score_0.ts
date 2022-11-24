const scheduleCourse: (courses: Array<Array<number>>) => number = function (courses) {
    courses.sort((a, b) => +a[1] - +b[1]);
    let queue: Heap = new Heap();
    let time: number = 0;
    for (let c of courses) {
        if (c[0] + time <= c[1]) {
            time += c[0];
            queue.push(c[0]);
        }
        else if (queue.size() > 0) {
            let top: number = queue.peek();
            if (top > c[0]) {
                queue.pop();
                queue.push(c[0]);
                time += c[0] - top;
            }
        }
    }
    return queue.size();
};
const getParent: (i: number) => number = (i) => Math.floor((i - 1) / 2);
const getLeft: (i: number) => number = (i) => 2 * i + 1;
const getRight: (i: number) => number = (i) => 2 * i + 2;
class Heap {
    compare: (a: number, b: number) => number;
    _heap: number[];
    constructor() {
        this.compare = (a, b) => +b - +a;
        this._heap = [];
    }
    size(): number {
        return this._heap.length;
    }
    _upper(i: number, j: number): boolean {
        return this.compare(this._heap[i], this._heap[j]) < 0;
    }
    _swap(i: number, j: number): void {
        let tmp: number = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = tmp;
    }
    push(item: number): number {
        this._heap.push(item);
        this._siftUp();
        return this.size();
    }
    _siftUp(): void {
        let node: number = this._heap.length - 1;
        while (node > 0 && this._upper(node, getParent(node))) {
            this._swap(node, getParent(node));
            node = getParent(node);
        }
    }
    peek(): number {
        return this._heap[0];
    }
    pop(): number {
        let ret: number = this._heap[0];
        if (this.size() > 1) {
            this._swap(0, this._heap.length - 1);
        }
        this._heap.pop();
        this._siftDown();
        return ret;
    }
    _siftDown(): void {
        let node: number = 0;
        while ((getRight(node) < this.size() && this._upper(getRight(node), node)) ||
            (getLeft(node) < this.size() && this._upper(getLeft(node), node))) {
            let upperChild: number = getRight(node) < this.size() &&
                this._upper(getRight(node), getLeft(node))
                ? getRight(node)
                : getLeft(node);
            this._swap(upperChild, node);
            node = upperChild;
        }
    }
}
