const { greatestArea } = require('./greatestArea');

describe('greatestArea', () => {
  test('Finds greatest area = 6', () => {
    const matrix = [
      [0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    const area = greatestArea(matrix);
    expect(area).toEqual(6);
  });

  test('Finds greatest area = 5', () => {
    const matrix = [
      [0, 1, 0, 0, 0],
      [0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const area = greatestArea(matrix);
    expect(area).toEqual(5);
  });

  test('Finds area of a row matrix', () => {
    const matrix = [[1, 1, 0, 0, 1, 1, 1]];
    const area = greatestArea(matrix);
    expect(area).toEqual(3);
  });

  test('Finds area of a column matrix', () => {
    const matrix = [[0], [0], [0], [1]];
    const area = greatestArea(matrix);
    expect(area).toEqual(1);
  });
});
