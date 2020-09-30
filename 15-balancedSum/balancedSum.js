/**
 * Find the index of the array that balances the left
 * and right sum. If no such position exists, return -1.
 * @param {Number[]} numbers An array of natural numbers
 */
function balancedSum(numbers) {
  if (!numbers.length || numbers.length < 2) {
    return -1;
  }
  let leftIndex = 0;
  let rightIndex = numbers.length - 2;
  let leftSum = 0;
  let rightSum = numbers[numbers.length - 1];

  while (leftIndex <= rightIndex) {
    if (leftSum < rightSum) {
      leftSum += numbers[leftIndex++];
    } else {
      rightSum += numbers[rightIndex--];
    }
  }
  return leftSum === rightSum ? leftIndex - 1 : -1;
}

module.exports = { balancedSum };
