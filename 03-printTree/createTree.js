/**
 * Create a binary tree object, based on a string input;
 * @param {String} treeString (value, leftNode, rightNode)
 */
function createTree(treeString) {
  const nodeArray = treeString.slice(1, treeString.length - 1).split(/,\(?/);
  let nodeIndex = 0;

  function createNode() {
    const nextNode = nodeArray[nodeIndex++];
    const braceIndex = nextNode.indexOf(')');

    if (nextNode === '') {
      return null;
    }
    if (braceIndex < 0) {
      return { value: nextNode, left: createNode(), right: createNode() };
    }
    return { value: nextNode.slice(0, braceIndex), left: null, right: null };
  }

  return createNode();
}

module.exports = { createTree };
