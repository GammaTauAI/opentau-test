const highestPeak: any = function (isWater) {
    let q: any = [];
    const visited: any = new Set();
    const m: number = isWater.length, n: number = isWater[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (isWater[i][j] === 1) {
                q.push([i, j, 0]);
                visited.add(`${i},${j}`);
            }
        }
    }
    const res: any = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs: any = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    while (q.length) {
        const size: number = q.length;
        const next: any = [];
        // Array.shift time complexity: O(n)
        for (let i = 0; i < size; i++) {
            const cur: any = q[i];
            const [row, col, val]: any = cur;
            for (let dir of dirs) {
                const newRow: number = row + dir[0], newCol: number = col + dir[1];
                const key: any = `${newRow},${newCol}`;
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
