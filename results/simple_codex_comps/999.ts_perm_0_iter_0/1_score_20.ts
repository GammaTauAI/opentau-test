var processQueries: any = function (queries, m) {
    const nums: any = Array.from({ length: m }, (_, i) => i + 1);
    const res: any = [];
    for (const q of queries) {
        const idx: any = nums.indexOf(q);
        nums.splice(idx, 1);
        nums.unshift(q);
        res.push(idx);
    }
    return res;
};
