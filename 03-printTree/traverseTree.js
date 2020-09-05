function infix(node) {
  if (node === null) {
    return '';
  }
  return infix(node.left) + node.value + infix(node.right);
}

function prefix(node) {
  if (node === null) {
    return '';
  }
  return node.value + prefix(node.left) + prefix(node.right);
}

function postfix(node) {
  if (node === null) {
    return '';
  }
  return postfix(node.left) + postfix(node.right) + node.value;
}

module.exports = { infix, prefix, postfix };
