const minMoves2: any = function (nums) {
    nums.sort((a, b) => a - b);
    let i: any = 0, j: number = nums.length - 1;
    let res: any = 0;
    while (i < j) {
        res += nums[j] - nums[i];
        i++;
        j--;
    }
    return res;
};
