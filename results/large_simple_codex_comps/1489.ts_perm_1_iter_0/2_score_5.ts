const RangeModule: () => any = function () {
    this.intervals = [];
};
RangeModule.prototype.addRange = function (left, right) {
    const n: number = this.intervals.length;
    const tmp: number [][] = [];
    for (let i = 0; i <= n; i++) {
        const cur: number [] = this.intervals[i];
        if (i === n || cur[0] > right) {
            tmp.push([left, right]);
            while (i < n)
                tmp.push(this.intervals[i++]);
        }
        else if (cur[1] < left)
            tmp.push(cur);
        else {
            left = Math.min(left, cur[0]);
            right = Math.max(right, cur[1]);
        }
    }
    this.intervals = tmp;
};
RangeModule.prototype.queryRange = function (left, right) {
    const n: number = this.intervals.length;
    let l: number = 0, r: number = n - 1;
    while (l <= r) {
        let m: number = ~~(l + (r - l) / 2);
        if (this.intervals[m][0] >= right)
            r = m - 1;
        else if (this.intervals[m][1] <= left)
            l = m + 1;
        else
            return this.intervals[m][0] <= left && this.intervals[m][1] >= right;
    }
    return false;
};
RangeModule.prototype.removeRange = function (left, right) {
    const n: number = this.intervals.length;
    const tmp: number [][] = [];
    for (let i = 0; i < n; i++) {
        const cur: number [] = this.intervals[i];
        if (cur[1] <= left || cur[0] >= right)
            tmp.push(cur);
        else {
            if (cur[0] < left)
                tmp.push([cur[0], left]);
            if (cur[1] > right)
                tmp.push([right, cur[1]]);
        }
    }
    this.intervals = tmp;
};
