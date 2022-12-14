const sortTransformedArray: (nums: any, a: any, b: any, c: any) => any[] = function (nums, a, b, c) {
    const n: any = nums.length;
    const sorted: any[] = new Array(n);
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
function quad(x: any, a: any, b: any, c: any): any {
    return a * x * x + b * x + c;
}
