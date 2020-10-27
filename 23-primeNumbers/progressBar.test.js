jest.mock('readline');
const readline = require('readline');
const primeNumbers = require('./primeNumbers');

describe('primeNumbers', () => {
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

  const mockRlWrite = jest.fn();
  const mockRlQuestion = jest.fn((query, callback) => callback(99));
  jest.spyOn(readline, 'createInterface').mockImplementation(() => ({
    on: () => {},
    close: () => {},
    question: mockRlQuestion,
    write: mockRlWrite,
  }));

  beforeEach(() => {
    mockedTerminal = '';
    terminalPosition = 0;
    terminalHistory = [];
    jest.clearAllMocks();
  });

  test('User is queried for N if not passed as an argument', async () => {
    const results = await primeNumbers(undefined, 80);
    const sumOfPrimes = results.reduce((sum, val) => sum + val, 0);

    expect.assertions(5);
    expect(mockRlQuestion).toHaveBeenCalledTimes(1);
    expect(mockRlQuestion).toHaveReturned();
    expect(results).toHaveLength(99);
    expect(results[98]).toEqual(523);
    expect(sumOfPrimes).toEqual(23592);
  });

  test('Progress bar is empty at 0% completion', () => {
    primeNumbers(5, 30);
    const initialBar = spyWrite.mock.calls[0][0].replace(regex, '');
    const expectedBar = `[--------------------] 00.0%`;

    expect(initialBar).toEqual(expectedBar);
    expect(mockRlWrite).toHaveBeenNthCalledWith(1, 'Calculating...\n');
  });

  test('Bar and percentage are updated as work is completed', () => {
    const n = 10;
    const width = 40;
    primeNumbers(n, width);

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

  test('Results are displayed when done', async () => {
    const n = 50;
    const results = await primeNumbers(n, 80);
    const sumOfPrimes = results.reduce((sum, val) => sum + val, 0);

    expect.assertions(5);
    expect(mockRlWrite).toHaveBeenNthCalledWith(
      2,
      '\n\x1b[33mResults:\n\x1b[32m'
    );
    expect(mockRlWrite).toHaveBeenLastCalledWith(
      '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229'
    );
    expect(results).toHaveLength(n);
    expect(results[n - 1]).toEqual(229);
    expect(sumOfPrimes).toEqual(5117);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    process.stdout.write('\x1b[0m\x1b[?25h');
  });
});
