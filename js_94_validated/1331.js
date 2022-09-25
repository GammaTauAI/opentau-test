const maximumSum = function (arr) {
  const n = arr.length;
  let oneDel = 0,
    noDel = arr[0],
    res = arr[0];

  for (let i = 1; i < n; i++) {
    oneDel = Math.max(noDel, oneDel + arr[i]);
    noDel = Math.max(arr[i], noDel + arr[i]);
    res = Math.max(res, oneDel, noDel);
  }

  return res;
};
