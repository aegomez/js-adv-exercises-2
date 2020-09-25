const { TreeNode: Node } = require('./TreeNode');
const { isSameLevel } = require('./isSameLevel');

/**
 *           0
 *     /  /  |  \  \
 *   1   2   3   5   7
 *      / \   \      |
 *     1   5   0     3
 *       / | \      / \
 *      3  5  9    3   0
 *         |          / \
 *         6         9   4
 */
const tree = new Node(0, [
  new Node(1),
  new Node(2, [
    new Node(1),
    new Node(5, [new Node(3), new Node(5, [new Node(6)]), new Node(9)]),
  ]),
  new Node(3, [new Node(0)]),
  new Node(5),
  new Node(7, [
    new Node(3, [new Node(3), new Node(0, [new Node(9), new Node(4)])]),
  ]),
]);

describe('isSameLevel', () => {
  test('Equal numbers are not found in the same level anywhere', () => {
    const output = isSameLevel(tree, 1, 1);
    expect(output).toBe(false);
  });

  test('Different numbers are not found in the same level anywhere', () => {
    const output = isSameLevel(tree, 0, 2);
    expect(output).toBe(false);
  });

  test('Equal numbers can be found in the same depth level', () => {
    const output = isSameLevel(tree, 3, 3);
    expect(output).toBe(true);
  });

  test('Different numbers can be found in the same depth level', () => {
    const output = isSameLevel(tree, 6, 4);
    expect(output).toBe(true);
  });
});
