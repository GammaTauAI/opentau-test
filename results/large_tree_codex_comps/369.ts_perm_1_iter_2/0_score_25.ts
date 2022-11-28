const countPaths: (n: number, roads: number[][]) => number = function (n, roads) {
    const graph: {
        [u: number]: number[][];
    } = {};
    for (let r of roads) {
        const [u, v, t] = r;
        if (graph[u] == null)
            graph[u] = [];
        if (graph[v] == null)
            graph[v] = [];
        graph[u].push([v, t]);
        graph[v].push([u, t]);
    }
    return dijkstra(graph, n, 0);
    function dijkstra(graph: {
        [u: number]: number[][];
    }, n: number, src: number): number {
        const dist: number[] = Array(n).fill(Infinity);
        const ways: number[] = Array(n).fill(0), mod: number = 1e9 + 7;
        ways[src] = 1;
        dist[src] = 0;
        const pq: any = new PriorityQueue((a, b) => a[0] === b[0] ? a[1] < b[1] : a[0] < b[0]);
        pq.push([0, 0]);
        while (!pq.isEmpty()) {
            const [d, u] = pq.pop();
            if (d > dist[u])
                continue;
            if (graph[u] == null)
                graph[u] = [];
            for (const [v, time] of graph[u]) {
                if (dist[v] > d + time) {
                    ways[v] = ways[u];
                    dist[v] = d + time;
                    pq.push([dist[v], v]);
                }
                else if (dist[v] === d + time) {
                    ways[v] = (ways[v] + ways[u]) % mod;
                }
            }
        }
        return ways[n - 1];
    }
};
class PriorityQueue {
    heap: number[];
    top: number;
    comparator: (a: any, b: any) => boolean;
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
    peek(): number {
        return this.heap[this.top];
    }
    push(...values: number[]): number {
        values.forEach((value) => {
            this.heap.push(value);
            this.siftUp();
        });
        return this.size();
    }
    pop(): number {
        const poppedValue: number = this.peek();
        const bottom: number = this.size() - 1;
        if (bottom > this.top) {
            this.swap(this.top, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }
    replace(value: number): number {
        const replacedValue: number = this.peek();
        this.heap[this.top] = value;
        this.siftDown();
        return replacedValue;
    }
    parent: (i: number) => number = (i) => ((i + 1) >>> 1) - 1;
    left: (i: number) => number = (i) => (i << 1) + 1;
    right: (i: number) => number = (i) => (i + 1) << 1;
    greater: (i: number, j: number) => boolean = (i, j) => this.comparator(this.heap[i], this.heap[j]);
    swap: (i: number, j: number) => [any, any] = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
    siftUp: () => void = () => {
        let node: number = this.size() - 1;
        while (node > this.top && this.greater(node, this.parent(node))) {
            this.swap(node, this.parent(node));
            node = this.parent(node);
        }
    };
    siftDown: () => void = () => {
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
