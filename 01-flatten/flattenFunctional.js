/**
 *
 * @param {any} input
 * @returns Boolean
 */
function isObject(input) {
  return (
    typeof input === 'object' && input !== null && !(input instanceof Array)
  );
}

/**
 *
 * @param {Object} oldObject
 * @param {String} parentName
 */
function flatten(oldObject, parentName) {
  return isObject(oldObject)
    ? Object.keys(oldObject).reduce(
        (prev, key) => ({
          ...prev,
          ...flatten(oldObject[key], `${parentName}_${key}`),
        }),
        {}
      )
    : { [parentName]: oldObject };
}

module.exports = flatten;
