const toGoatLatin: any = function (sentence) {
    const arr: any = sentence.split(" ");
    const vowel: any = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
    for (let i: number = 0, n: any = arr.length; i < n; i++) {
        const first: any = arr[i][0];
        const ma: any = vowel.has(first) ? "ma" : "";
        const tmp: any = !vowel.has(first) ? `${arr[i].slice(1)}${first}ma` : arr[i];
        const suffix: string = "a".repeat(i + 1);
        arr[i] = `${tmp}${ma}${suffix}`;
    }
    return arr.join(" ");
};
