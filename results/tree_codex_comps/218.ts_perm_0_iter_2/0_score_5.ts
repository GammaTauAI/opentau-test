const sumPrefixScores: (words: string[]) => number[] = function (words) {
    let trie: Trie = new Trie();
    for (let word of words) {
        trie.add(word);
    }
    let n: number = words.length, res: number[] = Array(n);
    for (let i: number = 0; i < words.length; i++) {
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
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    add(word: string): void {
        let node: TrieNode = this.root;
        for (let i: number = 0; i < word.length; i++) {
            node = node.children;
            let char: string = word[i];
            if (!node[char])
                node[char] = new TrieNode();
            node = node[char];
            node.count++;
        }
    }
    getScore(word: string): number {
        let node: TrieNode = this.root, score: number = 0;
        for (let i: number = 0; i < word.length; i++) {
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
