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
  const selectors = selector.split(/\s+<\s+/);
  const matchedParents = arraySelector(selectors[0], parentNode);

  if (selectors.length < 2) {
    return matchedParents;
  }

  const directChildrenSelectors = selectors.map(s => s.split(/[\s>~+]+/, 2));

  for (let i = 0; i < matchedParents.length; i++) {
    const matchedNodes = [{ node: matchedParents[i], depth: 1 }];
    while (matchedNodes.length) {
      const { node: currentNode, depth } = matchedNodes.pop();
      const [childSelector, rest] = directChildrenSelectors[depth];
      // search for direct children of the current node
      // that match the first part of the selector
      const directChildren = arraySelector(childSelector, currentNode).filter(
        childNode => childNode.parentNode === currentNode
      );
      // search for nodes that match the rest of the selector
      const nextNodes = rest
        ? directChildren.reduce(
            (nodes, childNode) =>
              nodes.concat(arraySelector(`:scope ${rest}`, childNode)),
            []
          )
        : directChildren;
      if (nextNodes.length && depth === selectors.length - 1) {
        // at least one node matches the full query
        matchedNodes.push(true);
        break;
      }
      // evaluate the next nodes using the next selector
      nextNodes.forEach(node => {
        matchedNodes.push({ node, depth: depth + 1 });
      });
    }
    if (!matchedNodes.length) {
      // none of the nodes match the full query for this parent
      matchedParents[i] = null;
    }
  }

  return matchedParents.filter(Boolean);
}

module.exports = querySelectorAll;
