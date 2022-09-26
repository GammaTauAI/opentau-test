const sortTransformedArray = function (nums, a, b, c) {
  const n = nums.length;
  const sorted = new Array(n);
  let i = 0,
    j = n - 1;
  let index = a >= 0 ? n - 1 : 0;
  while (i <= j) {
    if (a >= 0) {
      sorted[index--] =
        quad(nums[i], a, b, c) >= quad(nums[j], a, b, c)
          ? quad(nums[i++], a, b, c)
          : quad(nums[j--], a, b, c);
    } else {
      sorted[index++] =
        quad(nums[i], a, b, c) >= quad(nums[j], a, b, c)
          ? quad(nums[j--], a, b, c)
          : quad(nums[i++], a, b, c);
    }
  }
  return sorted;
};

function quad(x, a, b, c) {
  return a * x * x + b * x + c;
}
