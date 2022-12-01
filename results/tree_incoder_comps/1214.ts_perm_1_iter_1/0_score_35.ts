var sumFourDivisors: (nums: any) => any = function (nums) {
    let res: number = 0;
    for (const e of nums) {
        const set: any = helper(e);
        if (set.size === 4) {
            for (const i of set)
                res += i;
        }
    }
    return res;
    function helper(num: any): any {
        const set: any = new Set();
        const r: any = ~~(Math.sqrt(num) + 1);
        for (let i: number = 1; i < r; i++) {
            if (num % i === 0) {
                set.add(i);
                set.add(num / i);
            }
        }
        return set;
    }
};
