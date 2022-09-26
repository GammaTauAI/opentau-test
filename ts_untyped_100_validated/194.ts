const rotateGrid = function (grid, k) {
  const m = grid.length,
    n = grid[0].length;
  let top = 0,
    left = 0,
    right = n - 1,
    bottom = m - 1;
  while (top < bottom && left < right) {
    const num = (right - left + 1) * 2 + (bottom - top + 1) * 2 - 4;
    let rem = k % num;
    while (rem) {
      const tmp = grid[top][left];
      // top
      for (let i = left; i < right; i++) {
        grid[top][i] = grid[top][i + 1];
      }
      // right
      for (let i = top; i < bottom; i++) {
        grid[i][right] = grid[i + 1][right];
      }
      // bottom
      for (let i = right; i > left; i--) {
        grid[bottom][i] = grid[bottom][i - 1];
      }
      // left
      for (let i = bottom; i > top; i--) {
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
