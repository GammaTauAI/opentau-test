const highestPeak: (isWater: number[][]) => number[][] = function (isWater) {
    let q: number[][] = [];
    const visited: Set<string> = new Set();
    const m: number = isWater.length, n: number = isWater[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (isWater[i][j] === 1) {
                q.push([i, j, 0]);
                visited.add(`${i},${j}`);
            }
        }
    }
    const res: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs: number[][] = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    while (q.length) {
        const size: number = q.length;
        const next: number[][] = [];
        for (let i = 0; i < size; i++) {
            const cur: number[] = q[i];
            const [row, col, val]: number[] = cur;
            for (let dir of dirs) {
                const newRow: number = row + dir[0], newCol: number = col + dir[1];
                const key: string = `${newRow},${newCol}`;
                if (newRow < 0 ||
                    newRow >= m ||
                    newCol < 0 ||
                    newCol >= n ||
                    visited.has(key) ||
                    res[newRow][newCol] !== 0)
                    continue;
                next.push([newRow, newCol, val + 1]);
                res[newRow][newCol] = val + 1;
                visited.add(key);
            }
        }
        q = next;
    }
    return res;
};
