const isPrefixString: (s: string, words: string[]) => boolean = function (s, words) {
    let tmp: string = "";
    for (let word of words) {
        tmp += word;
        if (tmp === s)
            return true;
    }
    return false;
};
