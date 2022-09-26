const reconstructQueue = function (people) {
  const h = 0;
  const k = 1;
  people.sort((a, b) => (a[h] == b[h] ? a[k] - b[k] : b[h] - a[h]));
  let queue = [];
  for (let person of people) {
    queue.splice(person[k], 0, person);
  }
  return queue;
};
