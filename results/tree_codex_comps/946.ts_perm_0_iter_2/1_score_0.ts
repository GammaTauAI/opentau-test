const removeElement: (arr: number[], val: number) => number = function (nums, val) {
    let j: number = 0;
    for (let i: number = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[j] = nums[i];
            j++;
        }
    }
    return j;
};
