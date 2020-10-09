(function script() {
  const main = document.getElementById('container');
  const rangeControl = document.getElementById('range');
  const colorControl = document.getElementById('color');
  const rangeDisplay = document.getElementById('range-display');

  // half of the triangle side
  const MAX_SIZE = 320;

  // get the input value and iteratively create the triangle,
  // triangle size is controlled with a CSS custom property
  function createTriangle() {
    const range = parseInt(rangeControl.value, 10);
    const newSize = MAX_SIZE / 2 ** range;

    main.innerHTML = '';
    main.style.setProperty('--size', `${newSize}px`);

    rangeDisplay.textContent = range;

    const block = document.createElement('div');

    if (range === 0) {
      block.classList.add('triangle');
    } else {
      const row = document.createElement('div');
      let triangle = document.createElement('div');

      block.classList.add('block');
      row.classList.add('row');
      triangle.classList.add('triangle');

      for (let i = 0; i < range; i++) {
        const newTriangle = triangle.cloneNode(true);

        const topRow = row.cloneNode();
        topRow.appendChild(newTriangle);

        const bottomRow = topRow.cloneNode(true);
        bottomRow.appendChild(newTriangle.cloneNode(true));

        block.innerHTML = '';
        block.appendChild(topRow);
        block.appendChild(bottomRow);

        triangle = block;
      }
    }
    main.appendChild(block);
  }

  // update triangle color
  function updateColor() {
    const newColor = colorControl.value;
    main.style.setProperty('--color', newColor);
  }

  // assign the event listeners
  rangeControl.addEventListener('input', createTriangle);
  colorControl.addEventListener('change', updateColor);

  // initialize the default triangle
  createTriangle();
})();
