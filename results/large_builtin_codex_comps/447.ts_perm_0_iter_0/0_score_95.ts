const DinnerPlates: (capacity: any) => void = function (capacity) {
    this.capacity = capacity;
    this.stacks = [];
    this.pq = new PriorityQueue();
};
DinnerPlates.prototype.push = function (val) {
    if (this.pq.isEmpty()) {
        if (this.stacks.length > 0 &&
            this.stacks[this.stacks.length - 1].length < this.capacity) {
            this.stacks[this.stacks.length - 1].push(val);
        }
        else {
            this.stacks.push([]);
            this.stacks[this.stacks.length - 1].push(val);
        }
    }
    else {
        const num: any = this.pq.pop();
        this.stacks[num].push(val);
    }
};
DinnerPlates.prototype.pop = function () {
    while (this.stacks.length > 0 &&
        this.stacks[this.stacks.length - 1].length === 0) {
        const len: number = this.stacks.length - 1;
        while (!this.pq.isEmpty() && this.pq.peek() >= len) {
            this.pq.pop();
        }
        this.stacks.pop();
    }
    if (this.stacks.length === 0) {
        return -1;
    }
    else {
        return this.stacks[this.stacks.length - 1].pop();
    }
};
DinnerPlates.prototype.popAtStack = function (index) {
    const st: any = this.stacks[index];
    if (st && st.length > 0) {
        this.pq.push(index);
        return st.pop();
    }
    return -1;
};
class PriorityQueue {
    compare: any;
    last: any;
    arr: any;
    constructor() {
        this.compare = (a, b) => {
            return a < b;
        };
        this.last = 0;
        this.arr = [];
    }
    push(val: any): void {
        this.last++;
        this.arr[this.last] = val;
        this.up(this.last);
    }
    pop(): any {
        if (this.isEmpty()) {
            return null;
        }
        const res: any = this.arr[1];
        this.swap(1, this.last);
        this.last--;
        this.down(1);
        return res;
    }
    up(lo: any): void {
        while (lo > 1) {
            const currEl: any = this.arr[lo];
            const parent: number = Math.floor(lo / 2);
            const parentEl: any = this.arr[parent];
            if (this.compare(currEl, parentEl)) {
                this.swap(lo, parent);
            }
            else {
                break;
            }
            lo = parent;
        }
    }
    down(hi: any): void {
        while (hi * 2 <= this.last) {
            const currEl: any = this.arr[hi];
            let nextEl: any = this.arr[hi * 2];
            let nextIndex: number = hi * 2;
            if (hi * 2 + 1 <= this.last &&
                this.compare(this.arr[hi * 2 + 1], nextEl)) {
                nextIndex = hi * 2 + 1;
                nextEl = this.arr[nextIndex];
            }
            if (this.compare(nextEl, currEl)) {
                this.swap(hi, nextIndex);
            }
            else {
                break;
            }
            hi = nextIndex;
        }
    }
    swap(i: any, j: any): void {
        const temp: any = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    }
    peek(): any {
        if (this.isEmpty()) {
            return null;
        }
        return this.arr[1];
    }
    isEmpty(): boolean {
        return this.last < 1;
    }
}
