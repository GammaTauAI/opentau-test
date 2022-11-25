const findAllPeople: (n: number, meetings: number[], firstPerson: number) => number[] = function (n, meetings, firstPerson) {
    meetings.sort((a, b) => a[2] - b[2]);
    const uf: UnionFind = new UnionFind(n);
    uf.connect(0, firstPerson);
    let ppl: number[] = [];
    for (let i: number = 0, len: number = meetings.length; i < len;) {
        ppl = [];
        let time: number = meetings[i][2];
        while (i < len && meetings[i][2] === time) {
            uf.connect(meetings[i][0], meetings[i][1]);
            ppl.push(meetings[i][0]);
            ppl.push(meetings[i][1]);
            i++;
        }
        for (let n of ppl) {
            if (!uf.connected(0, n))
                uf.reset(n);
        }
    }
    let ans: number[] = [];
    for (let i: number = 0; i < n; ++i) {
        if (uf.connected(0, i))
            ans.push(i);
    }
    return ans;
};
class UnionFind {
    arr: number[];
    constructor(n) {
        this.arr = Array(n).fill(null);
        this.arr.forEach((e, i, arr) => (arr[i] = i));
    }
    connect(a: number, b: number): void {
        this.arr[this.find(a)] = this.find(this.arr[b]);
    }
    find(a: number): number {
        return this.arr[a] === a ? a : (this.arr[a] = this.find(this.arr[a]));
    }
    connected(a: number, b: number): boolean {
        return this.find(a) === this.find(b);
    }
    reset(a: number): void {
        this.arr[a] = a;
    }
}
