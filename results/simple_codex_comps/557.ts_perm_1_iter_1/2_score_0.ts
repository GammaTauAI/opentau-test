const checkPossibility: (nums: number[]) => boolean = function (nums) {
    let count: number = 0;
    let idx: number;
    if (nums.length === 1)
        return true;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) {
            count++;
            idx = i;
        }
    }
    if (count > 1)
        return false;
    if (idx === nums.length - 1 || idx === 1)
        return true;
    return (Math.max(...nums.slice(0, idx - 1)) <= Math.min(...nums.slice(idx)) ||
        Math.max(...nums.slice(0, idx)) <= Math.min(...nums.slice(idx + 1)));
};
