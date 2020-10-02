/**
 * Given a singly linked list as input, determine
 * if the content is a palindrome.
 * @param {Object} root Root node of the linked list { data, next }
 */
function isPalindrome(root) {
  if (root?.data === undefined || root.next === undefined) {
    return false;
  }

  const stack = [];
  let slow = root;
  let fast = root;

  // place the first half of the list into a stack
  while (fast !== null && fast.next !== null) {
    stack.push(slow.data);
    slow = slow.next;
    fast = fast.next.next;
  }

  // if list has odd length, ignore the middle element
  if (fast !== null) {
    slow = slow.next;
  }

  // compare the second half of the list and the stack
  while (slow !== null) {
    if (slow.data !== stack.pop()) {
      return false;
    }
    slow = slow.next;
  }

  return true;
}

module.exports = { isPalindrome };
