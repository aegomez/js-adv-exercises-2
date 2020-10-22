const parse = require('yargs-parser');
const primeNumbers = require('./primeNumbers');

(function main() {
  // get n if it was passed as an argument
  const argv = parse(process.argv.slice(2), {
    alias: { n: ['N', 'number', 'numbers'] },
    number: ['n'],
  });
  const width = process.stdout.columns ?? 50;

  primeNumbers(argv.n, width);
})();
