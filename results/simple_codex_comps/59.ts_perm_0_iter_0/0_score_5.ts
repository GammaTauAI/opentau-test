const FindSumPairs: Function = function (nums1, nums2) {
    this.nums1 = nums1;
    this.nums2 = nums2;
    const m: number = nums1.length, n: number = nums2.length;
    this.mp = {};
    for (let x of nums2) {
        if (this.mp[x] == null)
            this.mp[x] = 0;
        this.mp[x]++;
    }
};
FindSumPairs.prototype.add = function (index, val) {
    if (val !== 0) {
        if (!--this.mp[this.nums2[index]])
            delete this.mp[this.nums2[index]];
    }
    this.nums2[index] += val;
    if (this.mp[this.nums2[index]] == null)
        this.mp[this.nums2[index]] = 0;
    if (val !== 0)
        this.mp[this.nums2[index]]++;
};
FindSumPairs.prototype.count = function (tot) {
    let ans: number = 0;
    for (let x of this.nums1) {
        let res: number = tot - x;
        if (!this.mp[res])
            continue;
        ans += this.mp[res];
    }
    return ans;
};