const { createTree } = require('./createTree');
const { infix, prefix, postfix } = require('./traverseTree');

/**
 * Given a representation of a binary tree, traverse
 * all nodes in prefix, infix, or postfix order.
 * @param {String} tree (value, leftNode, rightNode)
 * @param {String} order 'infix' (default) | 'prefix' | 'postfix'
 */
function printTree(tree, order) {
  if (typeof tree !== 'string') {
    throw new Error('tree argument must be a string');
  }
  const ORDER = order === 'prefix' || order === 'postfix' ? order : 'infix';

  // parse the input string and create a tree object
  const binaryTree = createTree(tree);

  // traverse the tree in the requested order
  if (ORDER === 'infix') {
    return infix(binaryTree);
  }
  if (ORDER === 'prefix') {
    return prefix(binaryTree);
  }
  return postfix(binaryTree);
}

module.exports = { printTree };
