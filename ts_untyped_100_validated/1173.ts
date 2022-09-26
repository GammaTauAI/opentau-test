const countRectangles = function (rectangles, points) {
  const rect = rectangles;
  const matrix = Array.from({ length: 101 }, () => []);
  for (const [x, y] of rect) {
    matrix[y].push(x);
  }
  for (const row of matrix) row.sort((a, b) => a - b);
  const res = [];

  for (const [x, y] of points) {
    let cnt = 0;
    for (let i = y; i <= 100; i++) {
      const arr = matrix[i],
        n = arr.length;
      let l = 0,
        r = n;
      while (l < r) {
        const mid = l + Math.floor((r - l) / 2);
        if (mid === n || arr[mid] >= x) r = mid;
        else l = mid + 1;
      }
      cnt += n - l;
    }

    res.push(cnt);
  }

  return res;
};
