/**
 * Shorthand deep object property assignment.
 * Creates any property that does not exist.
 * Throws and error if any path property exists,
 * but is not an object, function or array.
 *
 * @param {Object} obj The original object
 * @param {String} path `path.to.deeply.nested.property`
 * @param {any} value Value of property
 */
function setProperty(obj, path, value) {
  if (!obj || typeof obj !== 'object' || typeof path !== 'string') {
    throw new Error('Invalid input');
  }

  const properties = path.split('.');
  let current = obj;
  let prop;

  for (let i = 0; i < properties.length; i++) {
    prop = properties[i];
    if (!Object.prototype.hasOwnProperty.call(current, prop)) {
      current[prop] = {};
    } else if (!(current[prop] instanceof Object)) {
      throw new Error(`Property ${prop} is not an object, function or array`);
    }
    if (i < properties.length - 1) {
      current = current[prop];
    } else {
      current[prop] = value;
    }
  }
}

module.exports = { setProperty };
