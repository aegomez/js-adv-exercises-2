const flattenArray = require('./flattenArrayIterative');

describe('iterative flattenArray', () => {
  test('flattens a multi-level array 1', () => {
    const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];

    const result = flattenArray(input);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('flattens a multi-level array 2', () => {
    const input = [['a'], [['b']], [[['c']]]];

    const result = flattenArray(input);

    expect(result).toEqual(['a', 'b', 'c']);
  });
});
