const scheduleCourse = function (courses) {
  courses.sort((a, b) => +a[1] - +b[1]);
  let queue = new Heap();
  let time = 0;
  for (let c of courses) {
    if (c[0] + time <= c[1]) {
      time += c[0];
      queue.push(c[0]);
    } else if (queue.size() > 0) {
      let top = queue.peek();
      if (top > c[0]) {
        queue.pop();
        queue.push(c[0]);
        time += c[0] - top;
      }
    }
  }
  return queue.size();
};

const getParent = (i) => Math.floor((i - 1) / 2);
const getLeft = (i) => 2 * i + 1;
const getRight = (i) => 2 * i + 2;
class Heap {
  compare;
  _heap;
  constructor() {
    this.compare = (a, b) => +b - +a;
    this._heap = [];
  }
  size() {
    return this._heap.length;
  }
  _upper(i, j) {
    return this.compare(this._heap[i], this._heap[j]) < 0;
  }
  _swap(i, j) {
    let tmp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = tmp;
  }
  push(item) {
    this._heap.push(item);
    this._siftUp();
    return this.size();
  }
  _siftUp() {
    let node = this._heap.length - 1;
    while (node > 0 && this._upper(node, getParent(node))) {
      this._swap(node, getParent(node));
      node = getParent(node);
    }
  }
  peek() {
    return this._heap[0];
  }
  pop() {
    let ret = this._heap[0];
    if (this.size() > 1) {
      this._swap(0, this._heap.length - 1);
    }
    this._heap.pop();
    this._siftDown();
    return ret;
  }
  _siftDown() {
    let node = 0;
    while (
      (getRight(node) < this.size() && this._upper(getRight(node), node)) ||
      (getLeft(node) < this.size() && this._upper(getLeft(node), node))
    ) {
      let upperChild =
        getRight(node) < this.size() &&
        this._upper(getRight(node), getLeft(node))
          ? getRight(node)
          : getLeft(node);
      this._swap(upperChild, node);
      node = upperChild;
    }
  }
}
