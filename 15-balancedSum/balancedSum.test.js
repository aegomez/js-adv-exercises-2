const { balancedSum } = require('./balancedSum');

describe('balancedSum', () => {
  test('Finds index in an array with even number of elements', () => {
    const array = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];
    const index = balancedSum(array);
    expect(index).toEqual(6);
  });

  test('Finds index in an array with odd number of elements', () => {
    const array = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 495];
    const index = balancedSum(array);
    expect(index).toEqual(9);
  });

  test('Array with no elements returns -1', () => {
    const array = [];
    const index = balancedSum(array);
    expect(index).toEqual(-1);
  });

  test('Array with one element cant have two sides', () => {
    const array = [100];
    const index = balancedSum(array);
    expect(index).toEqual(-1);
  });

  test('Finds index in an array with two elements', () => {
    const array = [5, 5];
    const index = balancedSum(array);
    expect(index).toEqual(0);
  });
});
