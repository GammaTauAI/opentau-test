const findKthPositive: any = function (arr, k) {
    let l: any = 0, r: any = arr.length, m: number;
    while (l < r) {
        m = (l + r) >> 1;
        if (arr[m] - 1 - m < k)
            l = m + 1;
        else
            r = m;
    }
    return l + k;
};
