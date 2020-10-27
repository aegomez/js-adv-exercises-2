jest.mock('readline');
const readline = require('readline');
const progressBar = require('./progressBar');

describe('primeNumbers/progressBar', () => {
  // eslint-disable-next-line no-control-regex
  const regex = /\x1b.+?[hlm]/g;
  let mockedTerminal = '';
  let terminalPosition = 0;
  let terminalHistory = [];

  const spyWrite = jest
    .spyOn(process.stdout, 'write')
    .mockName('write')
    .mockImplementation(string => {
      const noEscapeCode = string.replace(regex, '');
      mockedTerminal =
        mockedTerminal.slice(0, terminalPosition) +
        noEscapeCode +
        mockedTerminal.slice(terminalPosition + noEscapeCode.length);
      terminalHistory.push(mockedTerminal);
    });

  const spyCursorTo = jest
    .spyOn(readline, 'cursorTo')
    .mockName('cursorTo')
    .mockImplementation((_stream, x) => {
      terminalPosition = x;
    });

  beforeEach(() => {
    mockedTerminal = '';
    terminalPosition = 0;
    terminalHistory = [];
    jest.clearAllMocks();
  });

  test('Progress bar is empty at 0% completion', () => {
    progressBar(5, 30);
    const initialBar = spyWrite.mock.calls[0][0].replace(regex, '');
    const expectedBar = `[--------------------] 00.0%`;

    expect(initialBar).toEqual(expectedBar);
  });

  test('Bar and percentage are updated as work is completed', () => {
    const n = 10;
    const width = 40;
    progressBar(n, width);

    // setup + n bar updates + n percentage updates + 100%
    expect(spyWrite).toHaveBeenCalledTimes(2 * n + 2);
    expect(spyCursorTo).toHaveBeenCalledTimes(2 * n + 1);
    expect(mockedTerminal).toEqual(`[${'#'.repeat(width - 10)}] 100% `);
    expect(terminalHistory.filter((v, i) => i % 2 === 0)).toEqual([
      '[------------------------------] 00.0%',
      '[###---------------------------] 10.0%',
      '[######------------------------] 20.0%',
      '[#########---------------------] 30.0%',
      '[############------------------] 40.0%',
      '[###############---------------] 50.0%',
      '[##################------------] 60.0%',
      '[#####################---------] 70.0%',
      '[########################------] 80.0%',
      '[###########################---] 90.0%',
      '[##############################] 100.0',
    ]);
  });

  test('Results are returned when done', () => {
    const n = 50;
    const results = progressBar(n, 80);
    const sumOfPrimes = results.reduce((sum, val) => sum + val, 0);

    expect(results).toHaveLength(n);
    expect(results[n - 1]).toEqual(229);
    expect(sumOfPrimes).toEqual(5117);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    process.stdout.write('\x1b[0m\x1b[?25h');
  });
});
