/**
 * Find the greatest area formed by rectangles
 * of 1's in a binary matrix.
 * @param {Number[][]} matrix
 */
function greatestArea(matrix) {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;
  const height = Array.from({ length: colLength + 1 }, () => 0);
  let maxArea = 0;

  for (let row = 0; row < rowLength; row++) {
    // starting index of the previous rectangle (height > current height)
    const stack = [-1];
    for (let col = 0; col <= colLength; col++) {
      // update this column's height
      height[col] = matrix[row][col] === 1 ? height[col] + 1 : 0;

      // compare with left columns and calculate areas
      while (height[col] < height[stack[stack.length - 1]]) {
        // height of the first column inside the rectangle
        const h = height[stack.pop()];
        // last column - first column outside the rectangle
        const w = col - 1 - stack[stack.length - 1];
        const area = w * h;
        if (area > maxArea) {
          maxArea = area;
        }
      }
      stack.push(col);
    }
  }
  return maxArea;
}

module.exports = { greatestArea };
