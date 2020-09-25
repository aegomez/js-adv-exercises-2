class TreeNode {
  constructor(value = null, children = []) {
    this.value = value;
    /** @type {TreeNode[]} */
    this.children = children;
  }
}

module.exports = { TreeNode };
