const singleNumber: any = function (nums) {
    const hash: object = {};
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