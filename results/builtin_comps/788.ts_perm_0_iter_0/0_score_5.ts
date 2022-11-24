const minMoves2: (nums: any) => number = function (nums) {
    nums.sort((a, b) => a - b);
    let i: number = 0, j: number = nums.length - 1;
    let res: number = 0;
    while (i < j) {
        res += nums[j] - nums[i];
        i++;
        j--;
    }
    return res;
};
