const toGoatLatin: (sentence: string) => string = function (sentence) {
    const arr: string[] = sentence.split(" ");
    const vowel: Set<string> = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
    for (let i = 0, n = arr.length; i < n; i++) {
        const first: string = arr[i][0];
        const ma: "ma" | "" = vowel.has(first) ? "ma" : "";
        const tmp: string = !vowel.has(first) ? `${arr[i].slice(1)}${first}ma` : arr[i];
        const suffix: string = "a".repeat(i + 1);
        arr[i] = `${tmp}${ma}${suffix}`;
    }
    return arr.join(" ");
};
