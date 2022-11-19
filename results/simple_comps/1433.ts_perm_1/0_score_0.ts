const highestPeak: (isWater: Array<Array<number>>) => Array<Array<number>> = function (isWater) {
    let q: Array<[number, number, number]> = [];
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
    const res: Array<Array<number>> = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs: Array<[number, number]> = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    while (q.length) {
        const size: number = q.length;
        const next: Array<[number, number, number]> = [];
        // Array.shift time complexity: O(n)
        for (let i = 0; i < size; i++) {
            const cur: [number, number, number] = q[i];
            const [row, col, val]: [number, number, number] = cur;
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
