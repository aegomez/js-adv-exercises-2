/**
 * Returns all elements found by querySelectorAll as an array.
 * @param {String} selector CSS selector
 * @param {ParentNode} parentNode
 * @returns {[Element]}
 */
function arraySelector(selector, parentNode) {
  return [].slice.call(parentNode.querySelectorAll(selector));
}

/**
 * @param {String} selector <parent-selector> < <child-selector>
 * @param {ParentNode} parentNode Document (default)
 * @returns {[Element]}
 */
function querySelectorAll(selector, parentNode = document) {
  const selectors = selector.split('<');
  const lastIndex = selectors.length - 1;
  const selectedChildren = arraySelector(selectors[lastIndex], parentNode);

  return selectors
    .slice(0, lastIndex)
    .reduceRight(
      (nodes, currentSelector) =>
        nodes.reduce(
          (matchedParents, node) =>
            matchedParents.concat(
              arraySelector(currentSelector, node.parentNode.parentNode).find(
                selected => selected === node.parentNode
              ) || []
            ),
          []
        ),
      selectedChildren
    );
}

module.exports = querySelectorAll;
