const getMaxLen: (nums: number[]) => number = function (nums) {
    let res: number = 0, zeroIdx: number | null = -1, negIdx: number | null = -1, count: number | null = 0;
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] < 0) {
            count++;
            if (negIdx === -1)
                negIdx = i;
        }
        if (nums[i] === 0) {
            count = 0;
            negIdx = -1;
            zeroIdx = i;
        }
        else {
            if (count % 2 === 0)
                res = Math.max(res, i - zeroIdx);
            else
                res = Math.max(res, i - negIdx);
        }
    }
    return res;
};
