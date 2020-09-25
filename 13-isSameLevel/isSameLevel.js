const { Queue } = require('./Queue');

/**
 * Given the root of a tree and two numbers, n1 and n2,
 * search for these numbers and indicate if they are
 * found at the same depth level.
 * @ typedef
 * @param {Object} tree Non-binary tree {value, children[]]}
 * @param {Number} n1
 * @param {Number} n2
 */
function isSameLevel(tree, n1, n2) {
  if (!Number.isFinite(n1) || !Number.isFinite(n2)) {
    throw new Error('Argument is not a number');
  }

  const missingValue = [0];
  const queue = new Queue();
  queue.enqueue({ node: tree, depth: 0 });

  while (!queue.isEmpty()) {
    const { node, depth } = queue.dequeue();
    const { value, children } = node;

    if ((depth && value === n1) || value === n2) {
      if (missingValue[depth] === undefined) {
        missingValue[depth] = value === n1 ? n2 : n1;
      } else if (value === missingValue[depth]) {
        return true;
      }
    }

    for (let i = 0; i < children.length; i++) {
      queue.enqueue({ node: children[i], depth: depth + 1 });
    }
  }
  return false;
}

module.exports = { isSameLevel };
