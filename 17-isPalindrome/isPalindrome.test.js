const { LinkedList } = require('./LinkedList');
const { isPalindrome } = require('./isPalindrome');

describe('isPalindrome', () => {
  test('Detects a palindrome with odd length', () => {
    const input = new LinkedList(...'kayak');
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('Detects a palindrome with even length', () => {
    const input = new LinkedList(1, 2, 3, 3, 2, 1);
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('Detects that an input is NOT a palindrome', () => {
    const input = new LinkedList(...'palindrome');
    const output = isPalindrome(input);

    expect(output).toBe(false);
  });

  test('Can detect palindromes of different data types', () => {
    const input = new LinkedList(
      'never',
      'say',
      'never',
      null,
      555,
      555,
      null,
      'never',
      'say',
      'never'
    );
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('A single node with any data is a palindrome', () => {
    const input1 = new LinkedList('BIG DATA');
    const input2 = new LinkedList(null);
    const input3 = new LinkedList();

    expect(isPalindrome(input1)).toBe(true);
    expect(isPalindrome(input2)).toBe(true);
    expect(isPalindrome(input3)).toBe(true);
  });

  test('Detects palindromes in two-nodes lists', () => {
    const input1 = new LinkedList('1', '11');
    const input2 = new LinkedList('one', 'one');

    expect(isPalindrome(input1)).toBe(false);
    expect(isPalindrome(input2)).toBe(true);
  });

  test('An empty list or a non-linked list are not palindromes', () => {
    const input1 = { data: 'a' };
    const input2 = ['r', 'a', 'd', 'a', 'r'];

    expect(isPalindrome()).toBe(false);
    expect(isPalindrome(input1)).toBe(false);
    expect(isPalindrome(input2)).toBe(false);
  });
});
