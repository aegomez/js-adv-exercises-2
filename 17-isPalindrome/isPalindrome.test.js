const { LinkedList } = require('./LinkedList');
const { isPalindrome } = require('./isPalindrome');

describe('isPalindrome', () => {
  test('Detects that an input is a palindrome', () => {
    const input = new LinkedList(...'kayak');
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('Detects that an input is NOT a palindrome', () => {
    const input = new LinkedList(...'palindrome');
    const output = isPalindrome(input);

    expect(output).toBe(false);
  });

  test('Punctuation, capitalization and spaces are ignored', () => {
    const input = new LinkedList(...'Was it a car or a CAT I saw?');
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('Can detect word-unit palindromes', () => {
    // each node must contain a whole word
    const input = new LinkedList(
      'Did',
      'I',
      'say',
      'you',
      'never',
      'say',
      '"never',
      'say',
      'never"?',
      'You',
      'say',
      'I',
      'did.'
    );
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('A single node with data is a palindrome', () => {
    const input = new LinkedList('1');
    const output = isPalindrome(input);

    expect(output).toBe(true);
  });

  test('A single node with NO data is NOT a palindrome', () => {
    const input1 = new LinkedList(null);
    const input2 = new LinkedList();

    expect(isPalindrome(input1)).toBe(false);
    expect(isPalindrome(input2)).toBe(false);
  });

  test('An empty list or a non-linked list are not palindromes', () => {
    const input1 = { data: 'a' };
    const input2 = ['r', 'a', 'd', 'a', 'r'];

    expect(isPalindrome()).toBe(false);
    expect(isPalindrome(input1)).toBe(false);
    expect(isPalindrome(input2)).toBe(false);
  });
});
