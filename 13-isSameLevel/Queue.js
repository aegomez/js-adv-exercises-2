/* eslint-disable max-classes-per-file */
class ListNode {
  constructor(data = null) {
    this.data = data;
    /** @type {ListNode} */
    this.next = null;
  }
}

// Linked list implementation
class Queue {
  constructor() {
    /** @type {ListNode} */
    this.head = null;
    /** @type {ListNode} */
    this.tail = null;
  }

  enqueue(data) {
    const newNode = new ListNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    let node = null;
    if (this.head !== null) {
      node = this.head.data;
      this.head = this.head.next;
    }
    return node;
  }

  isEmpty() {
    return this.head === null;
  }
}

module.exports = { Queue };
