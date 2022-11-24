const twoSum: (nums: number[], target: number) => number[] = function (nums, target) {
    const myObject: Record<number, number> = {};
    for (let i = 0; i < nums.length; i++) {
        const complement: number = target - nums[i];
        if (myObject.hasOwnProperty(complement)) {
            return [myObject[complement], i];
        }
        myObject[nums[i]] = i;
    }
};
