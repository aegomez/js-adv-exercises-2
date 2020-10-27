const readline = require('readline');
const primes = require('./primesGenerator');

/**
 * @param {Number} n number of primes
 * @param {Number} width size of the bar
 */
function progressBar(n, width) {
  const cursorTo = x => readline.cursorTo(process.stdout, x);
  const primesGenerator = primes();
  const size = width - 10;
  const barStepInterval = Math.ceil(n / size);
  const results = [];
  let fill = 0;
  let lastFill = 0;
  let percentage = 0;
  let lastPercentage = 0;

  process.stdout.write(
    `\x1b[?25l[\x1b[37;41m${'-'.repeat(size)}\x1b[0m] \x1b[33m00.0%`
  );

  // runs for one extra iteration to fill the bar
  for (let i = 0; i <= n; i++) {
    results.push(primesGenerator.next().value);
    // update the progress bar
    if (i % barStepInterval === 0 || i === n) {
      fill = Math.round((size * i) / n);
      if (fill > lastFill) {
        cursorTo(lastFill + 1);
        process.stdout.write(`\x1b[30;46m${'#'.repeat(fill - lastFill)}`);
        lastFill = fill;
      }
    }
    percentage = (100 * i) / n;
    // update the current completed percentage
    if (percentage - lastPercentage >= 0.1) {
      cursorTo(size + 3);
      process.stdout.write(
        `\x1b[33;49m${percentage.toFixed(1).padStart(4, '0')}`
      );
      lastPercentage = percentage;
    }
  }
  // discard the extra number
  results.pop();

  cursorTo(size + 3);
  process.stdout.write('\x1b[33;49m100% \x1b[0m\x1b[?25h');

  return results;
}

module.exports = progressBar;
