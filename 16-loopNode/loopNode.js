/**
 * Find the node at the beginning of a loop in a singly
 * linked list. Returns `null` if no loop is found.
 * @param {Object} root Root node of the linked list { data, next }
 */
function loopNode(root) {
  if (!root || !root.next) return null;

  let slow = root;
  let fast = root;

  // search for the loop and its length
  do {
    if (fast === null || fast.next === null) {
      // reached end of list, no loop detected
      return null;
    }
    slow = slow.next;
    fast = fast.next.next;
  } while (slow !== fast);

  // reset slow pointer to the first position
  slow = root;

  // find the beginning of the loop
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

module.exports = { loopNode };
