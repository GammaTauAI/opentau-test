const rotateGrid: any = function (grid, k) {
    const m: any = grid.length, n: any = grid[0].length;
    let top: number = 0, left: number = 0, right: any = n - 1, bottom: any = m - 1;
    while (top < bottom && left < right) {
        const num: any = (right - left + 1) * 2 + (bottom - top + 1) * 2 - 4;
        let rem: any = k % num;
        while (rem) {
            const tmp: any = grid[top][left];
            // top
            for (let i: any = left; i < right; i++) {
                grid[top][i] = grid[top][i + 1];
            }
            // right
            for (let i: any = top; i < bottom; i++) {
                grid[i][right] = grid[i + 1][right];
            }
            // bottom
            for (let i: any = right; i > left; i--) {
                grid[bottom][i] = grid[bottom][i - 1];
            }
            // left
            for (let i: any = bottom; i > top; i--) {
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
