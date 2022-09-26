const minimumTimeRequired = function (jobs, k) {
  const workers = Array(k).fill(0);
  let res = Infinity;
  const n = jobs.length;

  dfs(0);

  return res;

  function dfs(idx) {
    if (idx === n) {
      res = Math.min(res, Math.max(...workers));
      return;
    }
    const visited = new Set();
    const e = jobs[idx];
    for (let i = 0; i < k; i++) {
      if (visited.has(workers[i])) continue;
      if (workers[i] + e >= res) continue;
      visited.add(workers[i]);
      workers[i] += e;
      dfs(idx + 1);
      workers[i] -= e;
      if (workers[i] === 0) break;
    }
  }
};
