const findKthPositive: (
            arr: Array<number>,
            k: number
        ) => number = function (arr, k) {
    let l: number = 0, r: number = arr.length, m: number;
    while (l < r) {
        m = (l + r) >> 1;
        if (arr[m] - 1 - m < k)
            l = m + 1;
        else
            r = m;
    }
    return l + k;
};
