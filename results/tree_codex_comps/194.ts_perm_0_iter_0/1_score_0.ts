const rotateGrid: (grid: (number[] | BigInt[])[], k: number) => (number[] | BigInt[])[] = function (grid, k) {
    const m: number | BigInt = grid.length, n: number | BigInt = grid[0].length;
    let top: number | BigInt = 0, left: number | BigInt = 0, right: number | BigInt = n - 1, bottom: number | BigInt = m - 1;
    while (top < bottom && left < right) {
        const num: number | BigInt = (right - left + 1) * 2 + (bottom - top + 1) * 2 - 4;
        let rem: number | BigInt = k % num;
        while (rem) {
            const tmp: number | BigInt = grid[top][left];
            // top
            for (let i: number = left; i < right; i++) {
                grid[top][i] = grid[top][i + 1];
            }
            // right
            for (let i: number = top; i < bottom; i++) {
                grid[i][right] = grid[i + 1][right];
            }
            // bottom
            for (let i: number = right; i > left; i--) {
                grid[bottom][i] = grid[bottom][i - 1];
            }
            // left
            for (let i: number = bottom; i > top; i--) {
                grid[i][left] = grid[i - 1][left];
            }
            grid[top + 1][left] = tmp;
            rem--;
        }
        left++;
        top++;
        right--;
        bottom--;
    }
    return grid;
};
