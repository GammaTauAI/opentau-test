const maximumSum: (arr: number[]) => number  = function (arr) {
    const n: number = arr.length;
    let oneDel: number = 0, noDel: number = arr[0], res: number = arr[0];
    for (let i = 1; i < n; i++) {
        oneDel = Math.max(noDel, oneDel + arr[i]);
        noDel = Math.max(arr[i], noDel + arr[i]);
        res = Math.max(res, oneDel, noDel);
    }
    return res;
};
