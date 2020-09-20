const querySelectorAll = require('./querySelectorAll');

beforeAll(() => {
  document.body.innerHTML = `
<section>
  <div id="1" class="note">
    <input type="checkbox" class="is-complete" checked />
  </div>
  <div id="2" class="note">
    <ul class="list">
      <li id="li-1">
        <strong class="bold-item">
          <em class="italics">Item B</em>
        </strong>
      </li>
    </ul>
  </div>
  <div id="3" class="note">
    <input type="checkbox" class="is-complete" checked />
  </div>
  <div id="4" class="note">
    <ul class="list">
      <li id="li-2">
        <strong class="bold-item">Item A</strong>
      </li>
    </ul>
  </div>
  <div id="5" class="note">
    <input type="checkbox" class="is-complete" checked />
  </div>
</section>`;
});

describe('querySelectorAll', () => {
  test('finds a list of parent elements', () => {
    const selector = 'div.note < input.is-complete';
    const nodes = querySelectorAll(selector);
    const parentIds = nodes.reduce((str, node) => str + node.id, '');

    expect(nodes.length).toBe(3);
    expect(nodes[0].nodeName).toBe('DIV');
    expect(nodes[0].className).toBe('note');
    expect(parentIds).toBe('135');

    const lastChild = nodes[0].lastElementChild;

    expect(lastChild.nodeName).toBe('INPUT');
    expect(lastChild.type).toBe('checkbox');
    expect(lastChild.className).toBe('is-complete');
    expect(lastChild.checked).toBe(true);
  });

  test('finds an element through several parent levels', () => {
    const selector = 'ul < li#li-1 < strong < em';
    const nodes = querySelectorAll(selector);

    expect(nodes.length).toBe(1);
    expect(nodes[0].nodeName).toBe('UL');
    expect(nodes[0].className).toBe('list');

    const lastChild = nodes[0].lastElementChild.lastElementChild;

    expect(lastChild.nodeName).toBe('STRONG');
    expect(lastChild.className).toBe('bold-item');
    expect(lastChild.parentNode.id).toBe('li-1');
  });

  test('finds elements using a complex selector', () => {
    const selector = 'div + .note < .list < [id^=li] .bold-item';
    const nodes = querySelectorAll(selector);
    const parentIds = nodes.reduce((str, node) => str + node.id, '');

    expect(nodes.length).toBe(2);
    expect(nodes[0].nodeName).toBe('DIV');
    expect(parentIds).toBe('24');
  });

  test('finds and manipulates elements', () => {
    const section = document.createElement('section');
    section.innerHTML = `
    <div class="new">
      <div class="note 1"><a href=""><span class="special">abc</span></a></div>
      <div class="note 2">NOT</div>
      <div class="note 3"><a href=""><span class="special">123</span></a></div>
    </div>`;
    document.body.appendChild(section);

    querySelectorAll('div.note < a span.special').forEach(el => {
      el.classList.add('selected');
    });
    const notes = document.querySelectorAll('.new div.note');

    expect(notes.length).toBe(3);
    expect(notes[0].classList.contains('selected')).toBe(true);
    expect(notes[1].classList.contains('selected')).toBe(false);
    expect(notes[2].classList.contains('selected')).toBe(true);
  });
});
