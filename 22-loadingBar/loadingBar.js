const { cursorTo } = require('readline');

const COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
];

/**
 * @param {Object} options
 * @param {Number=} options.size Width of the loading bar
 * @param {Number=} options.time Interval delay (ms)
 * @param {String=} options.foreground Foreground character, default `#`
 * @param {String=} options.background Background character, default `-`
 * @param {String=} options.color (default), black, red, green, yellow, blue, magenta, cyan, white
 */
function loadingBar(options) {
  // validate inputs
  let { size, time, foreground, background } = { ...options };
  const color = `${options?.color}`;

  if (typeof size !== 'number') {
    size = 48;
  } else if (size < 6) {
    size = 4;
  } else if (size > 80) {
    size = 78;
  } else {
    size -= 2;
  }

  if (typeof time !== 'number') {
    time = 20;
  } else if (time < 10) {
    time = 10;
  } else if (time > 2000) {
    time = 2000;
  }

  if (typeof foreground === 'string' && foreground.length) {
    [foreground] = foreground;
  } else {
    foreground = '#';
  }

  if (typeof background === 'string' && background.length) {
    [background] = background;
  } else {
    background = '-';
  }

  // change terminal color, if valid
  const colorIndex = COLORS.indexOf(color.toLowerCase());
  if (colorIndex > -1) {
    process.stdout.write(`\x1b[3${colorIndex}m`);
  }

  const fgLength = Math.ceil(size / 2);
  const bgLength = size - fgLength;

  // hide cursor
  process.stdout.write('\x1b[?25l');
  // initialize bar
  process.stdout.write(
    `[${foreground.repeat(fgLength) + background.repeat(bgLength)}]`
  );

  // periodically update bar
  let pos = 0;

  const intervalID = setInterval(() => {
    cursorTo(process.stdout, 1 + pos);
    process.stdout.write(background);
    cursorTo(process.stdout, 1 + ((fgLength + pos) % size));
    process.stdout.write(foreground);
    pos++;
    if (pos === size) {
      pos = 0;
    }
  }, time);

  // on exit (ctrl-c) restore terminal and clear interval
  process.on('SIGINT', () => {
    clearInterval(intervalID);
    process.stdout.write('\x1b[0m\x1b[?25h');
    process.exit(0);
  });

  // id can be used to cancel the timer
  return intervalID;
}

module.exports = loadingBar;
