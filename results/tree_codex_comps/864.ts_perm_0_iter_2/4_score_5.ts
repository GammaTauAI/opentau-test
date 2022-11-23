const maxSubArray: (arg0: any, arg1: number[]) => number = function (nums) {
    return helper(nums, 0, nums.length - 1);
};
function helper(arr: number[], l: number, r: number): number {
    if (l > r)
        return -Infinity;
    const mid: number = l + ((r - l) >> 1);
    let cur: number = 0, leftMax: number = 0, rightMax: number = 0;
    for (let i: number = mid - 1; i >= l; i--) {
        cur += arr[i];
        leftMax = Math.max(leftMax, cur);
    }
    cur = 0;
    for (let i: number = mid + 1; i <= r; i++) {
        cur += arr[i];
        rightMax = Math.max(rightMax, cur);
    }
    const res: number = arr[mid] + leftMax + rightMax;
    const leftRes: number = helper(arr, l, mid - 1);
    const rightRes: number = helper(arr, mid + 1, r);
    return Math.max(res, leftRes, rightRes);
}
