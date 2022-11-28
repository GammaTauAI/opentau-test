const containVirus: (grid: number[][]) => number = function (grid) {
    let ans: number = 0;
    while (true) {
        const walls: number = model(grid);
        if (walls === 0)
            break;
        ans += walls;
    }
    return ans;
    function model(grid: number[][]): number {
        const m: number = grid.length, n: number = grid[0].length;
        const virus: Set<number>[] = [], toInfect: Set<number>[] = [];
        const visited: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
        const walls: [number][] = [];
        for (let i: number = 0; i < m; i++) {
            for (let j: number = 0; j < n; j++) {
                if (grid[i][j] === 1 && visited[i][j] === 0) {
                    virus.push(new Set());
                    toInfect.push(new Set());
                    walls.push([0]);
                    dfs(grid, visited, virus[virus.length - 1], toInfect[toInfect.length - 1], walls[walls.length - 1], i, j);
                }
            }
        }
        let maxArea: number = 0, idx: number = -1;
        for (let i: number = 0; i < toInfect.length; i++) {
            if (toInfect[i].size > maxArea) {
                maxArea = toInfect[i].size;
                idx = i;
            }
        }
        if (idx === -1)
            return 0;
        for (let i: number = 0; i < toInfect.length; i++) {
            if (i !== idx) {
                for (let key of toInfect[i])
                    grid[(key / n) >> 0][key % n] = 1;
            }
            else {
                for (let key of virus[i])
                    grid[(key / n) >> 0][key % n] = -1;
            }
        }
        return walls[idx][0];
    }
    function dfs(grid: number[][], visited: number[][], virus: Set<number>, toInfect: Set<number>, wall: [number], row: number, col: number): void {
        const m: number = grid.length, n: number = grid[0].length;
        if (row < 0 || row >= m || col < 0 || col >= n || visited[row][col] === 1)
            return;
        if (grid[row][col] === 1) {
            visited[row][col] = 1;
            virus.add(row * n + col);
            const dir: number[] = [0, -1, 0, 1, 0];
            for (let i: number = 0; i < 4; i++)
                dfs(grid, visited, virus, toInfect, wall, row + dir[i], col + dir[i + 1]);
        }
        else if (grid[row][col] === 0) {
            wall[0]++;
            toInfect.add(row * n + col);
        }
    }
};
console.log(containVirus([
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
]));
