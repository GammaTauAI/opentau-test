const maximumMinutes: (grid: number[][]) => number = function (grid) {
    const [m, n] = [grid.length, grid[0].length];
    const dir: number[][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    function isValidCell(x: number, y: number): boolean {
        return x >= 0 && x < m && y >= 0 && y < n;
    }
    const fireDist: number[][] = new Array(m);
    for (let i: number = 0; i < m; i++) {
        fireDist[i] = new Array(n).fill(Infinity);
    }
    const firePoints: number[][] = [];
    for (let i: number = 0; i < m; i++) {
        for (let j: number = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                firePoints.push([i, j]);
                fireDist[i][j] = 0;
            }
        }
    }
    while (firePoints.length) {
        const [x0, y0] = firePoints.shift();
        for (const [dx, dy] of dir) {
            const [x1, y1] = [x0 + dx, y0 + dy];
            if (isValidCell(x1, y1) &&
                grid[x1][y1] === 0 &&
                fireDist[x0][y0] + 1 < fireDist[x1][y1]) {
                fireDist[x1][y1] = fireDist[x0][y0] + 1;
                firePoints.push([x1, y1]);
            }
        }
    }
    function canEscape(delay: number): boolean {
        const visited: boolean[][] = new Array(m);
        for (let i: number = 0; i < m; i++) {
            visited[i] = new Array(n).fill(false);
        }
        const queue: number[][] = [[0, 0]];
        let currMinutes: number = delay;
        while (queue.length) {
            currMinutes++;
            for (let i: number = queue.length; i > 0; i--) {
                const [i0, j0] = queue.shift();
                visited[i0][j0] = true;
                for (const [di, dj] of dir) {
                    const [i1, j1] = [i0 + di, j0 + dj];
                    if (isValidCell(i1, j1) &&
                        grid[i1][j1] === 0 &&
                        !visited[i1][j1] &&
                        (currMinutes < fireDist[i1][j1] ||
                            (currMinutes === fireDist[i1][j1] &&
                                i1 === m - 1 &&
                                j1 === n - 1))) {
                        if (i1 === m - 1 && j1 === n - 1) {
                            return true;
                        }
                        queue.push([i1, j1]);
                    }
                }
            }
        }
        return false;
    }
    let [left, right] = [-1, 1000000000];
    while (left < right) {
        const middle: number = Math.floor((left + right + 1) / 2);
        if (canEscape(middle)) {
            left = middle;
        }
        else {
            right = middle - 1;
        }
    }
    return left;
};
