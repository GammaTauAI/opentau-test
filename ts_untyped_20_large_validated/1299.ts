
class PriorityQueue {
  heap;
  top;
  comparator;
  constructor(comparator = (a, b) => a > b) {
    this.heap = []
    this.top = 0
    this.comparator = comparator
  }
  size() {
    return this.heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this.heap[this.top]
  }
  push(...values) {
    values.forEach((value) => {
      this.heap.push(value)
      this.siftUp()
    })
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > this.top) {
      this.swap(this.top, bottom)
    }
    this.heap.pop()
    this.siftDown()
    return poppedValue
  }
  replace(value) {
    const replacedValue = this.peek()
    this.heap[this.top] = value
    this.siftDown()
    return replacedValue
  }

  parent = (i) => ((i + 1) >>> 1) - 1
  left = (i) => (i << 1) + 1
  right = (i) => (i + 1) << 1
  greater = (i, j) => this.comparator(this.heap[i], this.heap[j])
  swap = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]])
  siftUp = () => {
    let node = this.size() - 1
    while (node > this.top && this.greater(node, this.parent(node))) {
      this.swap(node, this.parent(node))
      node = this.parent(node)
    }
  }
  siftDown = () => {
    let node = this.top
    while (
      (this.left(node) < this.size() && this.greater(this.left(node), node)) ||
      (this.right(node) < this.size() && this.greater(this.right(node), node))
    ) {
      let maxChild =
        this.right(node) < this.size() &&
        this.greater(this.right(node), this.left(node))
          ? this.right(node)
          : this.left(node)
      this.swap(node, maxChild)
      node = maxChild
    }
  }
}




const smallestRange = function (nums) {
  const pq = new PriorityQueue((a, b) => a[0] < b[0])
  const limit = 10 ** 5,
    n = nums.length,
    { max } = Math
  let right = -1e5,
    res = [-limit, limit]
  for (let i = 0; i < n; i++) {
    pq.push([nums[i][0], i, 0])
    right = max(right, nums[i][0])
  }
  while (pq.size()) {
    const cur = pq.pop()
    const [left, list, indice] = cur
    if (right - left < res[1] - res[0]) res = [left, right]
    if (indice + 1 === nums[list].length) return res
    right = max(right, nums[list][indice + 1])
    pq.push([nums[list][indice + 1], list, indice + 1])
  }
  return []
}

