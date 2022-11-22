function findSubsequences(nums: number[]): number[][] {
    const res: number[][] = [];
    helper([], 0, nums, res);
    return res;
}
function helper(list: number[], index: number, nums: number[], res: number[][]): void {
    if (list.length > 1) {
        res.push(Array.prototype.slice.call(list, 0));
    }
    const used: number[] = [];
    for (let i = index; i < nums.length; i++) {
        if (used.indexOf(nums[i]) !== -1) {
            continue;
        }
        if (list.length === 0 || nums[i] >= list[list.length - 1]) {
            used.push(nums[i]);
            list.push(nums[i]);
            helper(list, i + 1, nums, res);
            list.pop();
        }
    }
}
