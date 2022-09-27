const minPushBox = function (grid) {
  let box, person, target;
  const m = grid.length,
    n = grid[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const e = grid[i][j];
      if (e === "B") box = [i, j];
      else if (e === "T") target = [i, j];
      else if (e === "S") person = [i, j];
    }
  }

  const valid = ([i, j]) => {
    return i >= 0 && i < m && j >= 0 && j < n && grid[i][j] !== "#";
  };
  const key = ([i, j]) => `${i},${j}`;

  const chk = (person, newPerson, box) => {
    const set = new Set();
    set.add(key(box));
    let q = [person];
    while (q.length) {
      const tmp = [];
      const size = q.length;
      for (let i = 0; i < size; i++) {
        const [x, y] = q[i];
        if (key([x, y]) === key(newPerson)) return true;
        for (const [dx, dy] of dirs) {
          const [nx, ny] = [x + dx, y + dy];
          if (valid([nx, ny]) && !set.has(key([nx, ny]))) {
            set.add(key([nx, ny]));
            tmp.push([nx, ny]);
          }
        }
      }
      q = tmp;
    }
    return false;
  };

  let q = [[0, box, person]];
  const dkey = (a, b) => `${a[0]},${a[1]}_${b[0]},${b[1]}`;
  const set = new Set();
  set.add(dkey(box, person));
  while (q.length) {
    const size = q.length;
    const tmp = [];
    for (let i = 0; i < size; i++) {
      const [v, b, p] = q[i];
      if (key(b) === key(target)) return v;
      const bArr = [
        [b[0], b[1] + 1],
        [b[0], b[1] - 1],
        [b[0] + 1, b[1]],
        [b[0] - 1, b[1]],
      ];
      const pArr = [
        [b[0], b[1] - 1],
        [b[0], b[1] + 1],
        [b[0] - 1, b[1]],
        [b[0] + 1, b[1]],
      ];

      for (let j = 0; j < 4; j++) {
        const nb = bArr[j],
          np = pArr[j];
        const nk = dkey(nb, b);

        if (set.has(nk)) continue;
        let nb0 = nb[0],
          nb1 = nb[1];
        let np0 = np[0],
          np1 = np[1];
        if (valid([nb0, nb1]) && valid([np0, np1]) && chk(p, np, b)) {
          tmp.push([v + 1, nb, b]);
          set.add(nk);
        }
      }
    }
    q = tmp;
  }

  return -1;
};
