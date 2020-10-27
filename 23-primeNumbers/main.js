const parse = require('yargs-parser');
const readline = require('readline');
const progressBar = require('./progressBar');

(async function main() {
  // get n if it was passed as an argument
  const argv = parse(process.argv.slice(2), {
    alias: { n: ['N', 'number', 'numbers'] },
    number: ['n'],
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('close', () => {
    process.stdout.write('\x1b[0m\x1b[?25h');
    process.exit(0);
  });
  let { n } = argv;
  const width = process.stdout.columns ?? 50;

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

  // display progress bar
  rl.write('Calculating...\n');
  const results = progressBar(n, width);

  // display results
  rl.write('\n\x1b[33mResults:\n\x1b[32m');
  rl.write(results.join(', '));
  rl.close();
})();
