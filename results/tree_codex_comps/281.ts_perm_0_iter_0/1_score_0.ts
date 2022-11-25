const maximizeSweetness: (sweets: number[], K: number) => number = function (sweetness, K) {
    let left: number = 1, right: number = 1e9 / (K + 1);
    while (left < right) {
        let mid: number = (left + right + 1) >> 1;
        let cur: number = 0, cuts: number = 0;
        for (let a of sweetness) {
            if ((cur += a) >= mid) {
                cur = 0;
                if (++cuts > K)
                    break;
            }
        }
        if (cuts > K)
            left = mid;
        else
            right = mid - 1;
    }
    return left;
};
