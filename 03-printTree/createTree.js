// eslint-disable-next-line max-classes-per-file
class IllegalSyntaxError extends Error {}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const VALUE_TOKENS = /[^(),]/;

/**
 * @param {String} str
 * @param {Number} index
 */
function parseValue(str, index) {
  const start = index;
  let end = index;
  while (VALUE_TOKENS.test(str[end])) {
    end++;
  }
  const value = str.substring(start, end);
  const node = new Node(value);
  return [end, node];
}

/**
 * @param {String} str
 * @param {Number} index
 */
function parseNode(str, index) {
  if (',)'.indexOf(str[index]) > -1) {
    return [index, null];
  }
  if (str[index] !== '(') {
    throw new IllegalSyntaxError(index, str[index], '(');
  }
  let [index2, node] = parseValue(str, index + 1);
  if (node.value === '') {
    throw new IllegalSyntaxError(index2, str[index2], 'not null');
  }
  if (str[index2] === ',') {
    [index2, node.left] = parseNode(str, index2 + 1);
  }
  if (str[index2] === ',') {
    [index2, node.right] = parseNode(str, index2 + 1);
  }
  if (str[index2] !== ')') {
    throw new IllegalSyntaxError(index2, str[index2], ')');
  }
  return [index2 + 1, node];
}

/**
 * Create a binary tree object, based on a valid string input.
 * @param {String} tree (value, leftNode, rightNode)
 */
function createTree(tree) {
  const trimmedTree = tree.replace(/\s/g, '');
  const [index, root] = parseNode(trimmedTree, 0);
  if (index !== trimmedTree.length) {
    throw new IllegalSyntaxError(index);
  }
  return root;
}

module.exports = { createTree, IllegalSyntaxError };
