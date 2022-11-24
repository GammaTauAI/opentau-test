var sumFourDivisors: (nums: Array<number>) => number = function (nums) {
    let res: number = 0;
    for (const e of nums) {
        const set: Set<number> = helper(e);
        if (set.size === 4) {
            for (const i of set)
                res += i;
        }
    }
    return res;
    function helper(num: number): Set<number> {
        const set: Set<number> = new Set();
        const r: number = ~~(Math.sqrt(num) + 1);
        for (let i = 1; i < r; i++) {
            if (num % i === 0) {
                set.add(i);
                set.add(num / i);
            }
        }
        return set;
    }
};
