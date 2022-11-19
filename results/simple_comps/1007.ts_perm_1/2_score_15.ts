const twoSum: any = function (nums, target) {
    const myObject: any = {};
    for (let i = 0; i < nums.length; i++) {
        const complement: any = target - nums[i];
        if (myObject.hasOwnProperty(complement)) {
            return [myObject[complement], i];
        }
        myObject[nums[i]] = i;
    }
};
