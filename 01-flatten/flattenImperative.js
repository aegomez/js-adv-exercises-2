/**
 *
 * @param {Object} oldObject
 * @param {String} parentName
 */
function flatten(oldObject, parentName) {
  const output = {};
  const stack = [];

  let value = oldObject;
  let name = parentName;
  let keys = [];

  stack.push({ value, name });

  while (stack.length) {
    ({ value, name } = stack.pop());

    if (typeof value !== 'object' || value instanceof Array || value === null) {
      output[`${name}`] = value;
    } else {
      keys = Object.keys(value);

      for (let i = keys.length - 1; i >= 0; i--) {
        stack.push({
          value: value[keys[i]],
          name: `${name}_${keys[i]}`,
        });
      }
    }
  }

  return output;
}

module.exports = flatten;
