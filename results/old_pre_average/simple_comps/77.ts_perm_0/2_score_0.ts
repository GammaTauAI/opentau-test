const sortTransformedArray: (nums: number[], a: number, b: number, c: number) => number[] = function (nums, a, b, c) {
    const n: number = nums.length;
    const sorted: number[] = new Array(n);
    let i: number = 0, j: number = n - 1;
    let index: number = a >= 0 ? n - 1 : 0;
    while (i <= j) {
        if (a >= 0) {
            sorted[index--] =
                quad(nums[i], a, b, c) >= quad(nums[j], a, b, c)
                    ? quad(nums[i++], a, b, c)
                    : quad(nums[j--], a, b, c);
        }
        else {
            sorted[index++] =
                quad(nums[i], a, b, c) >= quad(nums[j], a, b, c)
                    ? quad(nums[j--], a, b, c)
                    : quad(nums[i++], a, b, c);
        }
    }
    return sorted;
};
function quad(x: number, a: number, b: number, c: number): number {
    return a * x * x + b * x + c;
}
