/* eslint-disable max-classes-per-file */
class LinkedListNode {
  constructor(value = null) {
    this.data = value;
    /** @type {LinkedListNode} */
    this.next = null;
  }
}

class LinkedList extends LinkedListNode {
  constructor(...values) {
    super(values[0]);
    let node = this;
    for (let i = 1; i < values.length; i++) {
      node.next = new LinkedListNode(values[i]);
      node = node.next;
    }
  }

  tail() {
    let tail = this;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return tail;
  }
}

module.exports = { LinkedList, LinkedListNode };
