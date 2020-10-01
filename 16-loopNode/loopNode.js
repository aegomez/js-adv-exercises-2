/**
 * Find the node at the beginning of a loop in a singly
 * linked list. Returns `null` if no loop is found.
 * @param {Object} root Root node of the linked list { data, next }
 */
function loopNode(root) {
  if (!root || !root.next) return null;

  let slow = root;
  let fast = root.next;
  let steps = 1;
  let stepsLimit = 1;

  // search successive powers of two (Brent's algorithm)
  while (slow !== fast) {
    if (fast.next === null) {
      // reached end of list, no loop detected
      return null;
    }
    if (steps === stepsLimit) {
      steps = 0;
      stepsLimit *= 2;
      slow = fast;
    }
    fast = fast.next;
    steps++;
  }

  // place slow and fast at a distance = steps (loop length)
  slow = root;
  fast = root;
  for (let i = 0; i < steps; i++) {
    fast = fast.next;
  }

  // find the beginning of the loop
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

module.exports = { loopNode };
