const hasPath = function (maze, start, destination) {
  const m = maze.length;
  const n = maze[0].length;
  const queue = [];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  queue.push(start);
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  while (queue.length) {
    const cur = queue.shift();
    if (cur[0] === destination[0] && cur[1] === destination[1]) return true;
    if (visited[cur[0]][cur[1]]) continue;
    visited[cur[0]][cur[1]] = true;
    for (let dir of dirs) {
      let x = cur[0],
        y = cur[1];
      while (x >= 0 && x < m && y >= 0 && y < n && maze[x][y] === 0) {
        x += dir[0];
        y += dir[1];
      }
      x -= dir[0];
      y -= dir[1];
      queue.push([x, y]);
    }
  }
  return false;
};
