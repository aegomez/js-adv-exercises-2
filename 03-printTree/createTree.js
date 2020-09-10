/**
 * Create a binary tree object, based on a valid string input.
 * @param {String} input (value, leftNode, rightNode)
 */
function createTree(input) {
  if (typeof input !== 'string' || input.length < 3) {
    throw new Error('Input string is not valid');
  }
  const rootNode = { value: null };
  const parentStack = [];
  let newNodeValue = '';

  if (input[0] === '(') {
    parentStack.push(rootNode);
  }

  for (let i = 1; i < input.length; i++) {
    const currentNode = parentStack[parentStack.length - 1];
    let next = input[i];

    if (!currentNode) {
      throw new Error('Invalid syntax: elements outside of braces');
    }

    if (next === ',') {
      if (currentNode.left === undefined) {
        if (!newNodeValue) {
          throw new Error('Invalid syntax: a node has no value');
        }
        currentNode.left = null;
      } else if (currentNode.right === undefined) {
        currentNode.right = null;
      } else {
        throw new Error('Invalid syntax: a node has more than two children');
      }
    } else if (next === '(') {
      if (currentNode.left === undefined) {
        throw new Error('Invalid syntax: nodes are not separated by commas');
      }
      const newNode = { value: null };
      if (currentNode.right === undefined) {
        currentNode.left = newNode;
      } else {
        currentNode.right = newNode;
      }
      parentStack.push(newNode);
    } else if (next === ')') {
      if (input[i + 1] && input[i + 1].match(/[^,)]/)) {
        throw new Error('Invalid syntax: nodes are not separated by commas');
      }
      if (!currentNode.value && !newNodeValue) {
        throw new Error('Invalid syntax: a node has no value');
      }
      if (currentNode.left === undefined) {
        currentNode.left = null;
      }
      if (currentNode.right === undefined) {
        currentNode.right = null;
      }
      parentStack.pop();
    } else {
      if (next.match(/\S/)) {
        if (currentNode.left !== undefined) {
          throw new Error('Invalid syntax: a node child is not a node or null');
        }
        newNodeValue += next;
      }
      next = '';
    }

    if (next && newNodeValue) {
      currentNode.value = newNodeValue;
      newNodeValue = '';
    }
  }

  if (parentStack.length) {
    throw new Error('Invalid syntax: unbalanced number of braces');
  }

  return rootNode;
}

module.exports = { createTree };
