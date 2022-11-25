const reconstructQueue: (people: any[][]) => any[][] = function (people) {
    const h: number = 0;
    const k: number = 1;
    people.sort((a, b) => (a[h] == b[h] ? a[k] - b[k] : b[h] - a[h]));
    let queue: any[][] = [];
    for (let person of people) {
        queue.splice(person[k], 0, person);
    }
    return queue;
};
