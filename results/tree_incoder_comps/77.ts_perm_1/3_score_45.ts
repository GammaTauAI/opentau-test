const sortTransformedArray: any = function (nums, a, b, c) {
    const n: any = nums.length;
    const sorted: any = new Array(n);
    let i: any = 0, j: any = n - 1;
    let index: any = a >= 0 ? n - 1 : 0;
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
function quad(x: any, a: number, b: number, c: any): any {
    return a * x * x + b * x + c;
}