const reachableNodes: (edges: [[number, number, number]] | Array<[number, number, number]>, maxMoves: number, n: number) => number = function (edges, maxMoves, n) {
    let res: number = 0, heap: Heap = new Heap(), state: number[] = new Array(n).fill(0), graph: Array<[number, number]>[] = Array.from(new Array(n), () => []), distance: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    for (let [u, v, d] of edges) {
        graph[u].push([v, d]);
        graph[v].push([u, d]);
    }
    distance[0] = 0;
    heap.insert([0, distance[0]]);
    while (heap.length != 0) {
        let t: [number, number] = heap.remove();
        if (state[t[0]] === 1)
            continue;
        if (distance[t[0]] <= maxMoves)
            res++;
        state[t[0]] = 1;
        for (let i of graph[t[0]]) {
            if (distance[i[0]] > distance[t[0]] + i[1] + 1) {
                distance[i[0]] = distance[t[0]] + i[1] + 1;
                heap.insert([i[0], distance[i[0]]]);
            }
        }
    }
    for (let [u, v, d] of edges) {
        let a: number = maxMoves - distance[u] >= 0 ? maxMoves - distance[u] : 0, b: number = maxMoves - distance[v] >= 0 ? maxMoves - distance[v] : 0;
        res += Math.min(d, a + b);
    }
    return res;
};
class Heap {
    heap: [number, number][];
    constructor() {
        this.heap = [];
    }
    get length() {
        return this.heap.length;
    }
    compare(i: number, j: number): boolean {
        if (!this.heap[j])
            return false;
        return this.heap[i][1] > this.heap[j][1];
    }
    swap(i: number, j: number): void {
        const temp: [number, number] = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    insert(num: [number, number]): void {
        this.heap.push(num);
        let idx: number = this.length - 1;
        let parent: number = (idx - 1) >> 1;
        while (idx !== 0 && this.compare(parent, idx)) {
            this.swap(parent, idx);
            idx = parent;
            parent = (idx - 1) >> 1;
        }
    }
    remove(): [number, number] {
        if (this.length === 1)
            return this.heap.pop();
        let res: [number, number] = this.heap[0], idx: number = 0, left: number = 1 | (idx << 1), right: number = (1 + idx) << 1;
        this.heap[0] = this.heap.pop();
        while (this.compare(idx, left) || this.compare(idx, right)) {
            if (this.compare(left, right)) {
                this.swap(idx, right);
                idx = right;
            }
            else {
                this.swap(idx, left);
                idx = left;
            }
            left = 1 | (idx << 1);
            right = (1 + idx) << 1;
        }
        return res;
    }
}
