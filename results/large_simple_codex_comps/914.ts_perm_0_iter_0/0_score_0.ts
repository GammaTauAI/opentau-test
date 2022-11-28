const hitBricks: (grid: number[][], hits: number[][]) => number[] = function (grid, hits) {
    const SPACE: number = 0;
    const BRICK: number = 1;
    const WILL_HIT: number = 2;
    const DIRECTIONS: number [][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const rows: number = grid.length;
    const cols: number = grid[0].length;
    const ds: DisjointSet = new DisjointSet(rows * cols + 1);
    for (const [hitR, hitC] of hits) {
        if (grid[hitR][hitC] === BRICK) {
            grid[hitR][hitC] = WILL_HIT;
        }
    }
    function hash(r: number, c: number): number {
        return r * cols + c + 1;
    }
    function unionAround(r: number, c: number): void {
        const hashed: number = hash(r, c);
        for (const [rDiff, cDiff] of DIRECTIONS) {
            const rNext: number = r + rDiff;
            const cNext: number = c + cDiff;
            if (grid[rNext] !== undefined && grid[rNext][cNext] === BRICK) {
                ds.union(hashed, hash(rNext, cNext));
            }
        }
        if (r === 0)
            ds.union(0, hashed);
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === BRICK)
                unionAround(i, j);
        }
    }
    let numBricksLeft: number = ds.sizes[ds.find(0)];
    const numBricksDropped: number[] = new Array(hits.length);
    // backwards
    for (let i = hits.length - 1; i >= 0; i--) {
        const [hitR, hitC]: number[] = hits[i];
        if (grid[hitR][hitC] === WILL_HIT) {
            grid[hitR][hitC] = BRICK;
            unionAround(hitR, hitC);
            const newNumBricksLeft: number = ds.sizes[ds.find(0)];
            numBricksDropped[i] = Math.max(newNumBricksLeft - numBricksLeft - 1, 0);
            numBricksLeft = newNumBricksLeft;
        }
        else {
            numBricksDropped[i] = 0;
        }
    }
    return numBricksDropped;
};
class DisjointSet {
    sizes: number[];
    parent: number[];
    constructor(n) {
        this.sizes = new Array(n).fill(1);
        this.parent = new Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }
    find(x: number): number {
        if (x === this.parent[x])
            return x;
        this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }
    union(x: number, y: number): void {
        const rootX: number = this.find(x);
        const rootY: number = this.find(y);
        if (rootX !== rootY) {
            // attach X onto Y
            this.parent[rootX] = rootY;
            this.sizes[rootY] += this.sizes[rootX];
        }
    }
}
