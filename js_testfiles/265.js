class Node {
  constructor(v) {
    this.val = v;
    this.children = new Map();
  }
}
const FileSystem = function () {
  this.r = new Node(null);
};

FileSystem.prototype.createPath = function (path, value) {
  if (path == null || path === "") return;
  const arr = path.split("/").filter((e) => e !== "/" && e !== "");
  let cur = this.r;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i !== len - 1 && !cur.children.has(arr[i])) return false;
    if (i === len - 1 && cur.children.has(arr[i])) return false;
    if (i !== len - 1) cur = cur.children.get(arr[i]);
  }
  cur.children.set(arr[arr.length - 1], new Node(value));
  return true;
};

FileSystem.prototype.get = function (path) {
  const arr = path.split("/").filter((e) => e !== "/" && e !== "");
  let cur = this.r;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!cur.children.has(arr[i])) return -1;
    cur = cur.children.get(arr[i]);
  }
  return cur.val;
};
