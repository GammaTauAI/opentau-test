const maxRepeating: (s: string, w: string) => number = function (sequence, word) {
    const s: number = sequence.length, w: number = word.length;
    const max_repeat: number = (s / w) >> 0;
    const failure: number[] = Array(w * max_repeat + 1).fill(0);
    const repeat_words: string = word.repeat(max_repeat) + "$";
    let result: number = 0, j: number = 0;
    for (let i: number = 1, hi: number = repeat_words.length; i < hi; i++) {
        while (j > 0 && repeat_words[j] !== repeat_words[i])
            j = failure[j - 1];
        j += repeat_words[j] === repeat_words[i] ? 1 : 0;
        failure[i] = j;
    }
    j = 0;
    for (let i: number = 0, len: number = sequence.length; i < len; i++) {
        while (j > 0 && repeat_words[j] !== sequence[i])
            j = failure[j - 1];
        j += repeat_words[j] === sequence[i] ? 1 : 0;
        result = Math.max(result, (j / w) >> 0);
    }
    return result;
};
