/**
 *
 * @param {Array} input
 */
function flattenArray(input) {
  const output = [];
  const stack = [input];

  while (stack.length) {
    const entry = stack.pop();

    if (Array.isArray(entry)) {
      for (let i = entry.length - 1; i >= 0; i--) {
        stack.push(entry[i]);
      }
    } else {
      output.push(entry);
    }
  }

  return output;
}

module.exports = flattenArray;
