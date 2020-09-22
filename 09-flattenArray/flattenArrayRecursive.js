/**
 *
 * @param {Array} input
 */
function flattenArray(input) {
  return Array.isArray(input)
    ? input.reduce((prev, val) => [...prev, ...flattenArray(val)], [])
    : [input];
}

module.exports = flattenArray;
