const hitBricks = function (grid, hits) {
  const SPACE = 0;
  const BRICK = 1;
  const WILL_HIT = 2;
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  const ds = new DisjointSet(rows * cols + 1);

  for (const [hitR, hitC] of hits) {
    if (grid[hitR][hitC] === BRICK) {
      grid[hitR][hitC] = WILL_HIT;
    }
  }

  function hash(r, c) {
    return r * cols + c + 1;
  }

  function unionAround(r, c) {
    const hashed = hash(r, c);
    for (const [rDiff, cDiff] of DIRECTIONS) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      if (grid[rNext] !== undefined && grid[rNext][cNext] === BRICK) {
        ds.union(hashed, hash(rNext, cNext));
      }
    }
    if (r === 0) ds.union(0, hashed);
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === BRICK) unionAround(i, j);
    }
  }
  let numBricksLeft = ds.sizes[ds.find(0)];
  const numBricksDropped = new Array(hits.length);
  // backwards
  for (let i = hits.length - 1; i >= 0; i--) {
    const [hitR, hitC] = hits[i];
    if (grid[hitR][hitC] === WILL_HIT) {
      grid[hitR][hitC] = BRICK;
      unionAround(hitR, hitC);
      const newNumBricksLeft = ds.sizes[ds.find(0)];
      numBricksDropped[i] = Math.max(newNumBricksLeft - numBricksLeft - 1, 0);
      numBricksLeft = newNumBricksLeft;
    } else {
      numBricksDropped[i] = 0;
    }
  }
  return numBricksDropped;
};

class DisjointSet {
  sizes;
  parent;
  constructor(n) {
    this.sizes = new Array(n).fill(1);
    this.parent = new Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }
  find(x) {
    if (x === this.parent[x]) return x;
    this.parent[x] = this.find(this.parent[x]);

    return this.parent[x];
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      // attach X onto Y
      this.parent[rootX] = rootY;
      this.sizes[rootY] += this.sizes[rootX];
    }
  }
}
