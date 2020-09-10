const { createTree } = require('./createTree');

describe('createTree', () => {
  test('creates a tree object based on an input string', () => {
    const input1 = '(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))';
    const binaryTree = createTree(input1);
    const expectedOutput = {
      value: 'A',
      left: {
        value: 'B',
        left: { value: 'D', left: null, right: null },
        right: { value: 'E', left: null, right: null },
      },
      right: {
        value: 'C',
        left: {
          value: 'F',
          left: { value: 'H', left: null, right: null },
          right: { value: 'I', left: null, right: null },
        },
        right: {
          value: 'G',
          left: null,
          right: { value: 'J', left: null, right: null },
        },
      },
    };

    expect(binaryTree).toEqual(expectedOutput);
  });

  test('accepts multiple valid input syntaxes', () => {
    const input2 =
      '(AA ,(XYZ,(www,(y, (y y y)), ( z1 , (z2), ))),(Hel lo , (1,),(2 , ,)))';
    const binaryTree = createTree(input2);
    const expectedOutput = {
      value: 'AA',
      left: {
        value: 'XYZ',
        left: {
          value: 'www',
          left: {
            value: 'y',
            left: { value: 'yyy', left: null, right: null },
            right: null,
          },
          right: {
            value: 'z1',
            left: { value: 'z2', left: null, right: null },
            right: null,
          },
        },
        right: null,
      },
      right: {
        value: 'Hello',
        left: { value: '1', left: null, right: null },
        right: { value: '2', left: null, right: null },
      },
    };

    expect(binaryTree).toEqual(expectedOutput);
  });

  test('rejects a variety of invalid syntaxes', () => {
    expect(() => {
      createTree('X(Y)');
    }).toThrow('Invalid syntax: elements outside of braces');

    expect(() => {
      createTree('(XY),Z');
    }).toThrow('Invalid syntax: elements outside of braces');

    expect(() => {
      createTree('(X, (YY,), (ZZZ,,))))');
    }).toThrow('Invalid syntax: elements outside of braces');

    expect(() => {
      createTree('(ab)c');
    }).toThrow('Invalid syntax: nodes are not separated by commas');

    expect(() => {
      createTree('(a,(b)(c))');
    }).toThrow('Invalid syntax: nodes are not separated by commas');

    expect(() => {
      createTree('(Foo,(Bar,),(,))');
    }).toThrow('Invalid syntax: a node has no value');

    expect(() => {
      createTree('(Foo,(),)');
    }).toThrow('Invalid syntax: a node has no value');

    expect(() => {
      createTree('(A,,,)');
    }).toThrow('Invalid syntax: a node has more than two children');

    expect(() => {
      createTree('(1,2,3)');
    }).toThrow('Invalid syntax: a node child is not a node or null');

    expect(() => {
      createTree('(((The Node)))');
    }).toThrow('Invalid syntax: nodes are not separated by commas');
  });
});
