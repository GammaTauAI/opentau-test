const sumPrefixScores: (words: any) => any = function (words) {
    let trie: any = new Trie();
    for (let word of words) {
        trie.add(word);
    }
    let n: number = words.length, res: any = Array(n);
    for (let i = 0; i < words.length; i++) {
        res[i] = trie.getScore(words[i]);
    }
    return res;
};
class TrieNode {
    children: any;
    count: number;
    constructor() {
        this.children = {};
        this.count = 0;
    }
}
class Trie {
    root: any;
    constructor() {
        this.root = new TrieNode();
    }
    add(word: any): any {
        let node: any = this.root;
        for (let i = 0; i < word.length; i++) {
            node = node.children;
            let char: string = word[i];
            if (!node[char])
                node[char] = new TrieNode();
            node = node[char];
            node.count++;
        }
    }
    getScore(word: any): any {
        let node: any = this.root, score: number = 0;
        for (let i = 0; i < word.length; i++) {
            node = node.children;
            let char: string = word[i];
            if (!node[char])
                return score;
            node = node[char];
            score += node.count;
        }
        return score;
    }
}
