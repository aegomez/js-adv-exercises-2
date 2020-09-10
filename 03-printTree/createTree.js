/**
 * Create a binary tree object, based on a valid string input.
 * @param {String} input (value, leftNode, rightNode)
 */
function createTree(input) {
  // saves the number of parsed commas in each node
  const commaStack = [];
  let jsonString = '';
  let newNodeValue = '';

  // parse the input and format it as a valid JSON string
  for (let i = 0; i < input.length; i++) {
    const currentNodeCommas = commaStack[commaStack.length - 1];
    const previousChildIsNull = jsonString[jsonString.length - 1] === ':';
    let next = input[i];

    if (next === ',') {
      if (currentNodeCommas === 0) {
        if (!newNodeValue) {
          throw new Error('Invalid syntax: a node has no value');
        }
        next += `"left":`;
      } else if (currentNodeCommas === 1) {
        next = `${previousChildIsNull ? 'null' : ''},"right":`;
      } else {
        throw new Error('Invalid syntax: a node has more than two children');
      }
      commaStack[commaStack.length - 1]++;
    } else if (next === '(') {
      next = '{';
      commaStack.push(0);
    } else if (next === ')') {
      if (!commaStack.length) {
        throw new Error('Invalid syntax: unbalanced number of braces');
      }
      next = previousChildIsNull ? 'null' : '';
      if (currentNodeCommas === 0) {
        next = `,"left":null,"right":null`;
      } else if (currentNodeCommas === 1) {
        next += ',"right":null';
      }
      next += '}';
      commaStack.pop();
    } else {
      if (next.match(/\S/)) {
        if (currentNodeCommas > 0) {
          throw new Error('Invalid syntax: a node child is not a node or null');
        }
        newNodeValue += next;
      }
      next = '';
    }

    if (next && newNodeValue) {
      next = `"value":"${newNodeValue}"${next}`;
      newNodeValue = '';
    }

    jsonString += next;
  }

  if (commaStack.length) {
    throw new Error('Invalid syntax: unbalanced number of braces');
  }

  // try to convert the string into an object,
  // possibly detecting other syntax errors
  return JSON.parse(jsonString);
}

module.exports = { createTree };
