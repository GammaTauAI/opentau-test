const isPrefixString: { <T, U extends T[]>(s: T, words: U): boolean } = function (s, words) {
    let tmp: string = "";
    for (let w of words) {
        tmp += w;
        if (tmp === s)
            return true;
    }
    return false;
};
