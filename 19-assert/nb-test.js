/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
(function (global) {
  let root = document.getElementById('results');
  const result = (text, pass) => {
    const el = document.createElement('li');
    el.textContent = text;
    if (pass !== undefined) {
      el.style.color = pass ? 'green' : 'red';
    }
    return el;
  };
  const assert = (pass, message) => root.appendChild(result(message, pass));
  function test(description, testBlock) {
    const parent = root;
    root = assert(undefined, description).appendChild(
      document.createElement('ul')
    );
    const testRoot = root;
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function (callback, ms, ...args) {
      function delayedCallback() {
        root = testRoot;
        callback(...args);
      }
      return originalSetTimeout(delayedCallback, ms);
    };
    testBlock();
    root = parent;
    global.setTimeout = originalSetTimeout;
  }
  global.assert = assert;
  global.test = test;
})(window);
