const distinctNames: (ideas: string[]) => number = function (ideas) {
    let smap: Set<string>[] = Array.from({ length: 26 }, (_) => new Set()), ans: number = 0;
    for (let i: number = 0; i < ideas.length; i++) {
        let word: string = ideas[i];
        smap[word.charCodeAt(0) - 97].add(word.slice(1));
    }
    for (let i: number = 0; i < 25; i++) {
        let a: Set<string> = smap[i];
        for (let j: number = i + 1; j < 26; j++) {
            let b: Set<string> = smap[j], count: number = 0;
            for (let w of a)
                if (b.has(w))
                    count++;
            ans += (a.size - count) * (b.size - count) * 2;
        }
    }
    return ans;
};
