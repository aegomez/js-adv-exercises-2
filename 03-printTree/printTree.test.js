const { printTree } = require('./printTree');

const binaryTree = '(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))';

describe('printTree', () => {
  test('prints default order', () => {
    const output = printTree(binaryTree);
    expect(output).toEqual('DBEAHFICGJ');
  });

  test('prints prefix order', () => {
    const order = 'prefix';
    const output = printTree(binaryTree, order);
    expect(output).toEqual('ABDECFHIGJ');
  });

  test('prints infix order', () => {
    const order = 'infix';
    const output = printTree(binaryTree, order);
    expect(output).toEqual('DBEAHFICGJ');
  });

  test('prints postfix order', () => {
    const order = 'postfix';
    const output = printTree(binaryTree, order);
    expect(output).toEqual('DEBHIFJGCA');
  });
});
