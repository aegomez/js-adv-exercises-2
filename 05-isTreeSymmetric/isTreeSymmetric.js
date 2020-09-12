function isTreeSymmetric(root) {
  if (!root || root.left === undefined || root.right === undefined) {
    return false;
  }
  const stack = [root.left, root.right];

  while (stack.length) {
    const right = stack.pop();
    const left = stack.pop();

    if (left || right) {
      if (left === null || right === null || left.value !== right.value) {
        return false;
      }
      stack.push(left.left);
      stack.push(right.right);
      stack.push(left.right);
      stack.push(right.left);
    }
  }
  return true;
}

module.exports = { isTreeSymmetric };
