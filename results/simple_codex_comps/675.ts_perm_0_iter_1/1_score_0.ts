const findPairs: (nums: number[], k: number) => number = function (nums, k) {
    if (k < 0)
        return 0;
    let count: number = 0;
    const hash: { [id: number]: number } = {};
    for (let i = 0; i < nums.length; i++) {
        hash[nums[i]] = i;
    }
    for (let i = 0; i < nums.length; i++) {
        if (hash.hasOwnProperty(nums[i] + k) && hash[nums[i] + k] !== i) {
            count++;
            delete hash[nums[i] + k];
        }
    }
    return count;
};
