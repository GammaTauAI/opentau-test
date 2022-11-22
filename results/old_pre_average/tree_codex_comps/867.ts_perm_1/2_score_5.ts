const toGoatLatin: Function = function (sentence) {
    const arr: String[] = sentence.split(" ");
    const vowel: Set<String> = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
    for (let i: number = 0, n: number = arr.length; i < n; i++) {
        const first: String = arr[i][0];
        const ma: String = vowel.has(first) ? "ma" : "";
        const tmp: String = !vowel.has(first) ? `${arr[i].slice(1)}${first}ma` : arr[i];
        const suffix: String = "a".repeat(i + 1);
        arr[i] = `${tmp}${ma}${suffix}`;
    }
    return arr.join(" ");
};
