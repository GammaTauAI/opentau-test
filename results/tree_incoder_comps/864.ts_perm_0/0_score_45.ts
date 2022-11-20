const maxSubArray: any = function (nums) {
    return helper(nums, 0, nums.length - 1);
};
function helper(arr: number, l: any, r: number): any {
    if (l > r)
        return -Infinity;
    const mid: number = l + ((r - l) >> 1);
    let cur: any = 0, leftMax: any = 0, rightMax: any = 0;
    for (let i: number = mid - 1; i >= l; i--) {
        cur += arr[i];
        leftMax = Math.max(leftMax, cur);
    }
    cur = 0;
    for (let i: number = mid + 1; i <= r; i++) {
        cur += arr[i];
        rightMax = Math.max(rightMax, cur);
    }
    const res: any = arr[mid] + leftMax + rightMax;
    const leftRes: any = helper(arr, l, mid - 1);
    const rightRes: any = helper(arr, mid + 1, r);
    return Math.max(res, leftRes, rightRes);
}
