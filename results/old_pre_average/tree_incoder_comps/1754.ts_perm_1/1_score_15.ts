const getMaxLen: any = function (nums) {
    let res: any = 0, zeroIdx: number = -1, negIdx: any = -1, count: number = 0;
    for (let i: number = 0, len: any = nums.length; i < len; i++) {
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
