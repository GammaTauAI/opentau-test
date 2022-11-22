var processQueries: (queries: number[], m:number) => number[] =
function (queries, m) {
    const nums: number[] = Array.from({ length: m }, (_, i) => i + 1);
    const res: number[] = [];
    for (const q of queries) {
        const idx: number = nums.indexOf(q);
        nums.splice(idx, 1);
        nums.unshift(q);
        res.push(idx);
    }
    return res;
};
