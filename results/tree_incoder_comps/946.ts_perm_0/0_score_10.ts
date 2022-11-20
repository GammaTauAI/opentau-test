const removeElement: any = function (nums, val) {
    let j: any = 0;
    for (let i: number = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[j] = nums[i];
            j++;
        }
    }
    return j;
};
