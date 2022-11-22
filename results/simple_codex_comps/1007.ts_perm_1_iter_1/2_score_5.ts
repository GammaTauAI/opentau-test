const twoSum: Function = function (nums, target) {
    const myObject: Object = {};
    for (let i = 0; i < nums.length; i++) {
        const complement: number = target - nums[i];
        if (myObject.hasOwnProperty(complement)) {
            return [myObject[complement], i];
        }
        myObject[nums[i]] = i;
    }
};
