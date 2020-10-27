const readline = require('readline');
const sieve = require('./sieve');

/**
 * @param {Number} N number of primes
 * @param {Number} width size of the bar
 */
async function primeNumbers(N, width) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('close', () => {
    process.stdout.write('\x1b[0m\x1b[?25h');
    process.exit(0);
  });
  let n = N;
  const size = width - 10;

  // if n was not initially provided, query the user
  while (!n) {
    // eslint-disable-next-line no-await-in-loop
    const input = await new Promise(resolve => {
      rl.question('How many numbers should be calculated? ', answer => {
        resolve(Number.parseInt(answer, 10));
      });
    });

    if (Number.isNaN(input)) {
      rl.write(`${input} is not a number...\n`);
    } else if (input < 1) {
      rl.write('Please enter a number greater that zero.\n');
    } else {
      n = input;
    }
  }

  rl.write('Calculating...\n');

  // display progress bar
  const cursorTo = x => readline.cursorTo(process.stdout, x);
  const barStepInterval = Math.ceil(n / size);
  const primesGenerator = sieve();
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

  // display results
  rl.write('\n\x1b[33mResults:\n\x1b[32m');
  rl.write(results.join(', '));
  rl.close();

  return results;
}

module.exports = primeNumbers;
