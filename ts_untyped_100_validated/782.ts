class Skiplist {
  head;
  constructor() {
    this.head = { down: null, right: null, val: -Infinity };
  }
  search(val) {
    let curr = this.head;
    while (curr) {
      while (curr.right && curr.right.val <= val) {
        curr = curr.right;
      }
      if (curr.val == val) {
        return true;
      }
      curr = curr.down;
    }
    return false;
  }
  add(val) {
    let curr = this.head;
    const insertion_positions = [];
    while (curr) {
      while (curr.right && curr.right.val < val) {
        curr = curr.right;
      }
      insertion_positions.push(curr);
      curr = curr.down;
    }
    let insert = true;
    let down = null;
    while (insert && insertion_positions.length) {
      const position = insertion_positions.pop();
      const node = { down, val, right: position.right };
      position.right = node;
      down = node;
      insert = Math.random() < 0.5;
    }
    if (insert) {
      const node = { val, down };
      this.head = { val: -Infinity, right: node, down: this.head };
    }
  }
  erase(val) {
    let curr = this.head;
    const erase_positions = [];
    while (curr) {
      while (curr.right && curr.right.val < val) {
        curr = curr.right;
      }
      if (curr.right && curr.right.val == val) {
        erase_positions.push(curr);
      }
      curr = curr.down;
    }
    const seen = erase_positions.length > 0;
    for (const position of erase_positions) {
      position.right = position.right && position.right.right;
    }
    return seen;
  }
}
