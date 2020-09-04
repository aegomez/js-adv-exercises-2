/**
 *
 * @param {Array} input
 */
function flattenArray(input) {
  const output = [];
  const stack = [...input];

  while (stack.length) {
    const entry = stack.pop();

    if (Array.isArray(entry)) {
      stack.push(...entry);
    } else {
      output.push(entry);
    }
  }

  return output.reverse();
}

module.exports = flattenArray;
