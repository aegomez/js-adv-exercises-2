const { isTreeSymmetric } = require('./isTreeSymmetric');
const { TreeNode } = require('./TreeNode');

describe('isTreeSymmetric', () => {
  test('detects that a tree is symmetric', () => {
    /*
     *        1
     *      /   \
     *     2     2
     *    / \   / \
     *   3   4 4   3
     *      /   \
     *     5     5
     */
    const binaryTree = new TreeNode(1);
    binaryTree.left = new TreeNode(
      2,
      new TreeNode(3),
      new TreeNode(4, new TreeNode(5))
    );
    binaryTree.right = new TreeNode(
      2,
      new TreeNode(4, null, new TreeNode(5)),
      new TreeNode(3)
    );

    const answer = isTreeSymmetric(binaryTree);
    expect(answer).toBe(true);
  });

  test('detects that a tree is NOT symmetric', () => {
    /*
     *          1
     *        /   \
     *      2       2
     *    /   \   /   \
     *   3     4 4     3
     *  / \   /   \   / \
     * 5   6 7     7 6   5
     *        \     \
     *         8     8
     */
    const binaryTree = new TreeNode(1);
    binaryTree.left = new TreeNode(
      2,
      new TreeNode(3, new TreeNode(5), new TreeNode(6)),
      new TreeNode(4, new TreeNode(7, null, new TreeNode(8)))
    );
    binaryTree.right = new TreeNode(
      2,
      new TreeNode(4, null, new TreeNode(7, null, new TreeNode(8))),
      new TreeNode(3, new TreeNode(6), new TreeNode(5))
    );
    const answer = isTreeSymmetric(binaryTree);
    expect(answer).toBe(false);
  });
});
