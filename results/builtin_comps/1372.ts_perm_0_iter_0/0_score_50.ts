const findMedianSortedArrays: (nums1: any, nums2: any) => any = function (nums1, nums2) {
    if (nums1.length > nums2.length)
        return findMedianSortedArrays(nums2, nums1);
    const m: any = nums1.length, n: any = nums2.length;
    let low: number = 0, high: any = m;
    while (low <= high) {
        const px: number = Math.floor((low + high) / 2);
        const py: number = Math.floor((m + n + 1) / 2) - px;
        const maxLeft1: any = px === 0 ? -Infinity : nums1[px - 1];
        const minRight1: any = px === m ? Infinity : nums1[px];
        const maxLeft2: any = py === 0 ? -Infinity : nums2[py - 1];
        const minRight2: any = py === n ? Infinity : nums2[py];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return ((Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2);
            }
            else {
                return Math.max(maxLeft1, maxLeft2);
            }
        }
        else if (maxLeft1 > minRight2) {
            high = px - 1;
        }
        else {
            low = px + 1;
        }
    }
};
