const maximumMinutes: (grid: Array<Array<number>>) => number = function (grid) {
    const [m, n]: Array<number> = [grid.length, grid[0].length];
    const dir: Array<Array<number>> = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    function isValidCell(x: number, y: number): boolean {
        return x >= 0 && x < m && y >= 0 && y < n;
    }
    const fireDist: Array<Array<number>> = new Array(m);
    for (let i = 0; i < m; i++) {
        fireDist[i] = new Array(n).fill(Infinity);
    }
    const firePoints: Array<Array<number>> = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                firePoints.push([i, j]);
                fireDist[i][j] = 0;
            }
        }
    }
    while (firePoints.length) {
        const [x0, y0]: Array<number> = firePoints.shift();
        for (const [dx, dy] of dir) {
            const [x1, y1]: Array<number> = [x0 + dx, y0 + dy];
            if (isValidCell(x1, y1) &&
                grid[x1][y1] === 0 &&
                fireDist[x0][y0] + 1 < fireDist[x1][y1]) {
                fireDist[x1][y1] = fireDist[x0][y0] + 1;
                firePoints.push([x1, y1]);
            }
        }
    }
    function canEscape(delay: number): boolean {
        const visited: Array<Array<boolean>> = new Array(m);
        for (let i = 0; i < m; i++) {
            visited[i] = new Array(n).fill(false);
        }
        const queue: Array<Array<number>> = [[0, 0]];
        let currMinutes: number = delay;
        while (queue.length) {
            currMinutes++;
            for (let i = queue.length; i > 0; i--) {
                const [i0, j0]: Array<number> = queue.shift();
                visited[i0][j0] = true;
                for (const [di, dj] of dir) {
                    const [i1, j1]: Array<number> = [i0 + di, j0 + dj];
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
    let [left, right]: Array<number> = [-1, 1000000000];
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
