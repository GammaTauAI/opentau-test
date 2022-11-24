const singleNumber: (nums: number[]) => number[] = function (nums) {
    const hash: { [key: number]: number } = {};
    nums.forEach((el, idx) => {
        if (hash.hasOwnProperty(el)) {
            hash[el] += 1;
            delete hash[el];
        }
        else {
            hash[el] = 1;
        }
    });
    return Object.keys(hash).map((el) => +el);
};
