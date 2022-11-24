function findSubsequences(nums: (number | string)[]): (number | string)[][] {
    const res: (number | string)[][] = [];
    helper([], 0, nums, res);
    return res;
}

function helper(list: (number | string)[], index: number, nums: (number | string)[], res: (number | string)[][]): void {
    if (list.length > 1) {
        res.push(Array.prototype.slice.call(list, 0));
    }
    const used: (number | string)[] = [];
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
