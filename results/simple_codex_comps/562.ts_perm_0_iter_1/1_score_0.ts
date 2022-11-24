function findSubsequences(nums: Array<number>): Array<Array<number>> {
    const res: Array<Array<number>> = [];
    helper([], 0, nums, res);
    return res;
}
function helper(list: Array<number>, index: number, nums: Array<number>, res: Array<Array<number>>): void {
    if (list.length > 1) {
        res.push(Array.prototype.slice.call(list, 0));
    }
    const used: Array<number> = [];
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
