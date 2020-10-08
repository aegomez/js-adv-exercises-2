const path = require('path');
const { readFileSync } = require('fs');

const html = readFileSync(path.resolve(__dirname, './index.html'));

jest.useFakeTimers();

describe('assert/nb-test', () => {
  document.body.innerHTML = html;
  const results = document.querySelector('ul#results');
  const script = document.querySelector('script[type=module]');

  // eslint-disable-next-line global-require
  require('./nb-test');
  // eslint-disable-next-line no-eval
  eval(script.innerHTML);

  const rootAsserts = results.querySelectorAll(':scope > li');
  const testBlockA = rootAsserts[1];
  const testBlockB = rootAsserts[3];

  it('All non-delayed tests appear immediately', () => {
    const rootAssertsText = [];
    const rootAssertsColors = [];
    rootAsserts.forEach(node => {
      rootAssertsText.push(node.firstChild.textContent);
      rootAssertsColors.push(node.style.color);
    });

    expect(rootAsserts.length).toEqual(5);
    expect(rootAssertsText).toStrictEqual([
      'Outside and before the test block',
      'TestBlock A',
      'Outside and after the TestBlock A',
      'TestBlock B',
      'Outside and after TestBlock B',
    ]);
    expect(rootAssertsColors).toStrictEqual([
      'green',
      '',
      'green',
      '',
      'green',
    ]);

    const assertsBlockA = testBlockA.querySelectorAll('li');
    const assertsBlockB = testBlockB.querySelectorAll('li');

    expect(assertsBlockA.length).toEqual(1);
    expect(assertsBlockA[0].textContent).toEqual('Inside TestBlock A');
    expect(assertsBlockA[0].style.color).toEqual('green');

    expect(assertsBlockB.length).toEqual(1);
    expect(assertsBlockB[0].textContent).toEqual('Inside TestBlock B');
    expect(assertsBlockB[0].style.color).toEqual('green');
  });

  it('Test delayed B appears after 0.5 seconds have elapsed', () => {
    let assertsBlockA = testBlockA.querySelectorAll('li');
    let assertsBlockB = testBlockB.querySelectorAll('li');

    expect(assertsBlockA.length).toEqual(1);
    expect(assertsBlockB.length).toEqual(1);

    jest.advanceTimersByTime(500);

    assertsBlockA = testBlockA.querySelectorAll('li');
    assertsBlockB = testBlockB.querySelectorAll('li');

    expect(assertsBlockA.length).toEqual(1);
    expect(assertsBlockB.length).toEqual(2);

    expect(assertsBlockB[0].textContent).toEqual('Inside TestBlock B');
    expect(assertsBlockB[1].textContent).toEqual('test delayed B');
    expect(assertsBlockB[1].style.color).toEqual('green');
  });

  it('Test delayed A appears after 1 second has elapsed', () => {
    let assertsBlockA = testBlockA.querySelectorAll('li');
    let assertsBlockB = testBlockB.querySelectorAll('li');

    expect(assertsBlockA.length).toEqual(1);
    expect(assertsBlockB.length).toEqual(2);

    jest.advanceTimersByTime(500);

    assertsBlockA = testBlockA.querySelectorAll('li');
    assertsBlockB = testBlockB.querySelectorAll('li');

    expect(assertsBlockA.length).toEqual(2);
    expect(assertsBlockB.length).toEqual(2);

    expect(assertsBlockA[0].textContent).toEqual('Inside TestBlock A');
    expect(assertsBlockA[1].textContent).toEqual('test delayed A');
    expect(assertsBlockA[1].style.color).toEqual('green');
  });
});
