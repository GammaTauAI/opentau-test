var minimumIncompatibility: any = function (nums, k) {
    if (k === nums.length) {
        return 0;
    }
    const counts: number[] = Array(nums.length + 1).fill(0);
    for (let num of nums) {
        counts[num]++;
        if (counts[num] > k) {
            return -1;
        }
    }
    const size: number = nums.length / k;
    let ans: number = Number.MAX_VALUE;
    const backtracking: any = (groupIdx, index, sum, lowIndex, curIndex) => {
        if (index === size) {
            sum += curIndex - lowIndex;
            if (sum > ans) {
                return;
            }
            if (groupIdx === k - 1) {
                ans = sum;
                return;
            }
            else {
                groupIdx++;
                index = 0;
            }
        }
        if (index === 0) {
            for (let i = 0; i < counts.length; i++) {
                if (counts[i]) {
                    counts[i]--;
                    backtracking(groupIdx, index + 1, sum, i, i);
                    counts[i]++;
                }
            }
        }
        else {
            for (let i = curIndex + 1; i < counts.length; i++) {
                if (counts[i]) {
                    counts[i]--;
                    backtracking(groupIdx, index + 1, sum, lowIndex, i);
                    counts[i]++;
                }
            }
        }
    };
    backtracking(0, 0, 0, 0, 0);
    return ans;
};
