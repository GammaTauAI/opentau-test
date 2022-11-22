const scheduleCourse: any = function (courses) {
    courses.sort((a, b) => +a[1] - +b[1]);
    let queue: any = new Heap();
    let time: any = 0;
    for (let c of courses) {
        if (c[0] + time <= c[1]) {
            time += c[0];
            queue.push(c[0]);
        }
        else if (queue.size() > 0) {
            let top: any = queue.peek();
            if (top > c[0]) {
                queue.pop();
                queue.push(c[0]);
                time += c[0] - top;
            }
        }
    }
    return queue.size();
};
const getParent: any = (i) => Math.floor((i - 1) / 2);
const getLeft: any = (i) => 2 * i + 1;
const getRight: any = (i) => 2 * i + 2;
class Heap {
    compare: any;
    _heap: any;
    constructor() {
        this.compare = (a, b) => +b - +a;
        this._heap = [];
    }
    size(): any {
        return this._heap.length;
    }
    _upper(i: any, j: any): any {
        return this.compare(this._heap[i], this._heap[j]) < 0;
    }
    _swap(i: any, j: any): any {
        let tmp: any = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = tmp;
    }
    push(item: any): any {
        this._heap.push(item);
        this._siftUp();
        return this.size();
    }
    _siftUp(): any {
        let node: any = this._heap.length - 1;
        while (node > 0 && this._upper(node, getParent(node))) {
            this._swap(node, getParent(node));
            node = getParent(node);
        }
    }
    peek(): any {
        return this._heap[0];
    }
    pop(): any {
        let ret: any = this._heap[0];
        if (this.size() > 1) {
            this._swap(0, this._heap.length - 1);
        }
        this._heap.pop();
        this._siftDown();
        return ret;
    }
    _siftDown(): any {
        let node: any = 0;
        while ((getRight(node) < this.size() && this._upper(getRight(node), node)) ||
            (getLeft(node) < this.size() && this._upper(getLeft(node), node))) {
            let upperChild: any = getRight(node) < this.size() &&
                this._upper(getRight(node), getLeft(node))
                ? getRight(node)
                : getLeft(node);
            this._swap(upperChild, node);
            node = upperChild;
        }
    }
}
