const isPrefixString: ((s: string, words: (string | void)[]) => boolean) = function (s, words) {
    let tmp: string = "";
    for (let w of words) {
        tmp += w;
        if (tmp === s)
            return true;
    }
    return false;
};
