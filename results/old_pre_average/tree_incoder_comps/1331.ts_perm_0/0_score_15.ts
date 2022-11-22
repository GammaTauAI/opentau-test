const maximumSum: any = function (arr) {
    const n: number = arr.length;
    let oneDel: number = 0, noDel: any = arr[0], res: any = arr[0];
    for (let i: number = 1; i < n; i++) {
        oneDel = Math.max(noDel, oneDel + arr[i]);
        noDel = Math.max(arr[i], noDel + arr[i]);
        res = Math.max(res, oneDel, noDel);
    }
    return res;
};
