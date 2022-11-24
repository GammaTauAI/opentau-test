const reconstructQueue: (people: number[][]) => number[][] = function (people) {
    const h: number = 0;
    const k: number = 1;
    people.sort((a, b) => (a[h] == b[h] ? a[k] - b[k] : b[h] - a[h])); // sort by height descending
    let queue: number[][] = [];
    for (let person of people) { // insert each person into the queue
        queue.splice(person[k], 0, person);
    }
    return queue;
};
