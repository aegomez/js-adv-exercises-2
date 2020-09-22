function isTreeSymmetric(root) {
  if (!root || root.left === undefined || root.right === undefined) {
    return false;
  }
  const stack = [{ left: root.left, right: root.right }];

  while (stack.length) {
    const { left, right } = stack.pop();

    if (left || right) {
      if (left === null || right === null || left.value !== right.value) {
        return false;
      }
      stack.push({ left: left.left, right: right.right });
      stack.push({ left: left.right, right: right.left });
    }
  }
  return true;
}

module.exports = { isTreeSymmetric };
