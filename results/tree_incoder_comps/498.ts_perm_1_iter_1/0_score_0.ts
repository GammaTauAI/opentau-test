const isPrefixString: (s: String, words: String) => boolean = function (s, words) {
    let tmp: String = "";
    for (let w of words) {
        tmp += w;
        if (tmp === s)
            return true;
    }
    return false;
};
