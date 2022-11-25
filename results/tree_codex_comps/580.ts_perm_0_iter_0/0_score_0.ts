const colorBorder: (grid: string[][], r0: number, c0: number, color: string) => string[][] = function (grid, r0, c0, color) {
    const dirs: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    const c: string = grid[r0][c0];
    const rows: number = grid.length;
    const cols: number = grid[0].length;
    const visited: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
    dfs(r0, c0, c, rows, cols, visited, grid, dirs);
    for (let i: number = 0; i < rows; i++) {
        for (let j: number = 0; j < cols; j++) {
            if (visited[i][j] === -1) {
                if (i === 0 || j === 0 || i === rows - 1 || j === cols - 1) {
                    visited[i][j] = -2;
                }
                else {
                    for (let dir of dirs) {
                        if (visited[i + dir[0]][j + dir[1]] === 0) {
                            visited[i][j] = -2;
                            break;
                        }
                    }
                }
            }
        }
    }
    for (let i: number = 0; i < rows; i++) {
        for (let j: number = 0; j < cols; j++) {
            if (visited[i][j] === -2)
                grid[i][j] = color;
        }
    }
    return grid;
};
function dfs(row: number, col: number, target: string, rows: number, cols: number, visited: number[][], grid: string[][], dirs: number[][]): void {
    if (row >= rows ||
        col >= cols ||
        row < 0 ||
        col < 0 ||
        grid[row][col] !== target ||
        visited[row][col] === -1) {
        return;
    }
    visited[row][col] = -1;
    for (let dir of dirs) {
        dfs(row + dir[0], col + dir[1], target, rows, cols, visited, grid, dirs);
    }
}
