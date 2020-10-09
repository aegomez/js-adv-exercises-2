const { readFileSync } = require('fs');
const { resolve } = require('path');

describe('Sierpinski Triangle', () => {
  // setup
  const html = readFileSync(resolve(__dirname, 'index.html'));
  document.documentElement.innerHTML = html;

  const container = document.getElementById('container');
  const rangeControl = document.getElementById('range');
  const colorControl = document.getElementById('color');
  const rangeDisplay = document.getElementById('range-display');

  rangeControl.value = 0;

  // eslint-disable-next-line global-require
  require('./script');

  // helper functions
  const getRowsSelector = range => {
    let selector = '.row';
    for (let i = 1; i < range; i++) {
      selector += ' .block:first-child .row';
    }
    return selector;
  };

  test('The triangle is initialized with 0 divisions', () => {
    const triangles = container.getElementsByClassName('triangle');
    const blocks = container.getElementsByClassName('block');
    const rows = container.getElementsByClassName('row');

    expect(triangles.length).toEqual(1);
    expect(blocks.length).toEqual(0);
    expect(rows.length).toEqual(0);

    expect(colorControl.value).toEqual('#000000');
    expect(rangeControl.value).toEqual('0');
    expect(rangeDisplay.textContent).toEqual('0');
  });

  test('Changing the range input updates the view (3)', () => {
    const inputValue = 3;

    rangeControl.value = inputValue;
    rangeControl.dispatchEvent(new Event('input'));

    const triangles = container.getElementsByClassName('triangle');
    const blocks = container.getElementsByClassName('block');
    const rows = container.querySelectorAll(getRowsSelector(inputValue));
    const customSize = container.style.getPropertyValue('--size');

    expect(rangeControl.value).toEqual(`${inputValue}`);
    expect(rangeDisplay.textContent).toEqual(`${inputValue}`);

    expect(triangles.length).toEqual(27); // 3^inputValue
    expect(blocks.length).toEqual(13); // 3^0 + 3^1 + 3^2
    expect(rows.length).toEqual(8); // 2^inputValue

    expect(customSize).toEqual('40px'); // 320 / 2^inputValue
  });

  test('Changing the range input updates the view (5)', () => {
    const inputValue = 5;

    rangeControl.value = inputValue;
    rangeControl.dispatchEvent(new Event('input'));

    const triangles = container.getElementsByClassName('triangle');
    const blocks = container.getElementsByClassName('block');
    const rows = container.querySelectorAll(getRowsSelector(inputValue));
    const customSize = container.style.getPropertyValue('--size');

    expect(rangeControl.value).toEqual(`${inputValue}`);
    expect(rangeDisplay.textContent).toEqual(`${inputValue}`);

    expect(triangles.length).toEqual(243); // 3^inputValue
    expect(blocks.length).toEqual(121); // 3^0 + 3^1 + ... + 3^4
    expect(rows.length).toEqual(32); // 2^inputValue

    expect(customSize).toEqual('10px'); // 320 / 2^inputValue
  });

  test('Changing the color input updates the view', () => {
    const newColor = '#004488';

    colorControl.value = newColor;
    colorControl.dispatchEvent(new Event('change'));

    const customColor = container.style.getPropertyValue('--color');

    expect(customColor).toEqual('#004488');
  });
});
