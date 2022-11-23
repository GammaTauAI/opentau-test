const removeDuplicates: <T>(S: string) => string = function (S) {
    const queue: string[] = [];
    for (let i: number = 0; i < S.length; i++) {
        if (queue.length > 0 && queue[queue.length - 1] === S[i]) {
            queue.pop();
        }
        else {
            queue.push(S[i]);
        }
    }
    return queue.join("");
};
