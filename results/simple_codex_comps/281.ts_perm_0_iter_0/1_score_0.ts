const maximizeSweetness: (sweetness: number[], K: number) => number = function (sweetness, K) {
    let left: number = 1, right: number = 1000000000 / (K + 1);
    while (left < right) {
        let mid: number = (left + right + 1) >> 1;
        let curr: number = 0, cuts: number = 0;
        for (let a of sweetness) {
            if ((curr += a) >= mid) {
                curr = 0;
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
