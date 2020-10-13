const parse = require('yargs-parser');
const loadingBar = require('./loadingBar');

(function main() {
  const parseOptions = {
    alias: {
      size: ['s'],
      time: ['t'],
      foreground: ['f'],
      background: ['b'],
      color: ['c', 'colour'],
      help: ['h'],
    },
    boolean: ['help'],
    number: ['size', 'time'],
    string: ['foreground', 'background', 'color'],
  };
  const argv = parse(process.argv.slice(2), parseOptions);

  if (argv.help) {
    process.stdout.write(`Optional arguments:
    -s,--size        min: 6, max: 82
    -t,--time        min: 10, max: 2000
    -f,--foreground  string
    -b,--background  string
    -c,--color       black, white, red, green, yellow, blue, magenta, cyan
    -h,--help`);
    return;
  }

  const size = argv.size || process.stdout.columns;
  const { time, color, foreground, background } = argv;

  loadingBar({ size, time, foreground, background, color });
})();
