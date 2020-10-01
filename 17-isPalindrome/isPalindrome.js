/**
 * Given a singly linked list as input, determine
 * if the content is a palindrome.
 * @param {Object} root Root node of the linked list { data, next }
 */
function isPalindrome(root) {
  if (
    root?.data === null ||
    root?.data === undefined ||
    root.next === undefined
  ) {
    return false;
  }

  let data = '';
  let forward = '';
  let reverse = '';
  let node = root;

  while (node !== null) {
    data = `${node.data}`.toLowerCase().replace(/[^a-z0-9]/g, '');
    forward += data;
    reverse = data + reverse;
    node = node.next;
  }

  return forward === reverse;
}

module.exports = { isPalindrome };
