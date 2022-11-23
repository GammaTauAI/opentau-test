const maximizeSweetness: (...params: any[]) => any = function (sweetness, K) {
    let left: number = 1, right: number = 1000000000 / (K + 1);
    while (left < right) {
        let mid: number = (left + right + 1) >> 1;
        let cur: number = 0, cuts: number = 0;
        for (const value of sweetness) {
            if ((cur += value) >= mid) {
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