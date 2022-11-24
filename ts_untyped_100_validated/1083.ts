const minInterval = function (intervals, queries) {
  const n = intervals.length;
  const m = queries.length;
  const sortedQueryIdx = [...Array(m).keys()].sort(
    (a, b) => queries[a] - queries[b]
  );
  intervals.sort((a, b) => a[0] - b[0]); // sort by start & ascending
  const minHeap = new BinaryHeap((c, p) => c.size >= p.size);
  const res = Array(m).fill(0);
  let i = 0;
  for (const idx of sortedQueryIdx) {
    const query = queries[idx];
    while (i < n && intervals[i][0] <= query) {
      minHeap.push({
        size: intervals[i][1] - intervals[i][0] + 1,
        start: intervals[i][0],
        end: intervals[i][1],
      });
      i++;
    }
    while (!minHeap.isEmpty() && minHeap.peek().end < query) {
      minHeap.pop();
    }
    res[idx] = minHeap.isEmpty() ? -1 : minHeap.peek().size;
  }
  return res;
};

class BinaryHeap {
  content;
  compareFn;

  constructor(compareFn) {
    this.content = [];
    this.compareFn = compareFn; // Min-Heap: (c, p) => c > p
  }

  size() {
    return this.content.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.size() > 0 ? this.content[0] : null;
  }

  push(node) {
    this.content.push(node);
    this._bubbleUp(this.content.length - 1);
  }

  pop() {
    if (this.content.length === 0) return null;
    const root = this.content[0];
    const last = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = last;
      this._sinkDown(0);
    }
    return root;
  }

  remove(node) {
    const length = this.content.length;
    for (let i = 0; i < length; i++) {
      if (this.content[i] !== node) continue;
      const last = this.content.pop();
      if (i === length - 1) break;
      this.content[i] = last;
      this._bubbleUp(i);
      this._sinkDown(i);
      break;
    }
  }

  _bubbleUp(idx) {
    const node = this.content[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx + 1) / 2) - 1;
      const parent = this.content[parentIdx];
      if (this.compareFn(node, parent)) break;
      this.content[parentIdx] = node;
      this.content[idx] = parent;
      idx = parentIdx;
    }
  }

  _sinkDown(idx) {
    const node = this.content[idx];
    while (true) {
      const child2Idx = (idx + 1) * 2;
      const child1Idx = child2Idx - 1;
      let swapIdx = -1;
      if (child1Idx < this.content.length) {
        const child1 = this.content[child1Idx];
        if (!this.compareFn(child1, node)) swapIdx = child1Idx;
      }
      if (child2Idx < this.content.length) {
        const child2 = this.content[child2Idx];
        const compareNode = swapIdx === -1 ? node : this.content[child1Idx];
        if (!this.compareFn(child2, compareNode)) swapIdx = child2Idx;
      }
      if (swapIdx === -1) break;
      this.content[idx] = this.content[swapIdx];
      this.content[swapIdx] = node;
      idx = swapIdx;
    }
  }
}
