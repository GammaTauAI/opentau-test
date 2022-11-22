const colorBorder: any = function (grid, r0, c0, color) {
    const dirs: any = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    const c: any = grid[r0][c0];
    const rows: any = grid.length;
    const cols: any = grid[0].length;
    const visited: any = Array.from({ length: rows }, () => new Array(cols).fill(0));
    dfs(r0, c0, c, rows, cols, visited, grid, dirs);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
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
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === -2)
                grid[i][j] = color;
        }
    }
    return grid;
};
function dfs(row: any, col: any, target: any, rows: any, cols: any, visited: any, grid: any, dirs: any): any {
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
