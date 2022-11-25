const maxSubArray: (nums: number[]) => number = function (nums) {
    return helper(nums, 0, nums.length - 1);
};
function helper(arr: any, l: any, r: any): any {
    if (l > r)
        return -Infinity;
    const mid: any = l + ((r - l) >> 1);
    let cur: number = 0, leftMax: number = 0, rightMax: number = 0;
    for (let i: any = mid - 1; i >= l; i--) {
        cur += arr[i];
        leftMax = Math.max(leftMax, cur);
    }
    cur = 0;
    for (let i: any = mid + 1; i <= r; i++) {
        cur += arr[i];
        rightMax = Math.max(rightMax, cur);
    }
    const res: any = arr[mid] + leftMax + rightMax;
    const leftRes: any = helper(arr, l, mid - 1);
    const rightRes: any = helper(arr, mid + 1, r);
    return Math.max(res, leftRes, rightRes);
}
