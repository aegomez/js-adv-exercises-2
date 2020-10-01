const { LinkedList } = require('./LinkedList');
const { loopNode } = require('./loopNode');

describe('loopNode', () => {
  test('Finds the node at the beginning of the loop', () => {
    const list = new LinkedList(1, 2, 3, 4, 5, 6, 7, 8, 9);
    list.tail().next = list.next.next.next;

    const node = loopNode(list);
    expect(node.data).toEqual(4);
    expect(node.next.data).toEqual(5);
  });

  test('Resolves a circular linked list ', () => {
    const root = new LinkedList(11, 22);
    root.tail().next = root;

    const node = loopNode(root);
    expect(node.data).toEqual(11);
    expect(node.next.data).toEqual(22);
  });

  test('Returns null for a list that has no loops', () => {
    const root = new LinkedList('a', 'b', 'c', 'd');

    const node = loopNode(root);
    expect(node).toEqual(null);
  });
});
