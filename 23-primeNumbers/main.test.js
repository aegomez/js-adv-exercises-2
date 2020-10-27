/* eslint-disable global-require */
jest.mock('readline');
jest.mock('./progressBar');
const readline = require('readline');
const progressBar = require('./progressBar');

describe('primeNumbers/main', () => {
  const mockRlWrite = jest.fn();
  const mockRlQuestion = jest.fn((query, cb) => cb(99));
  const mockedPrimes = [2, 3, 5, 7, 11];
  const width = process.stdout.columns;

  const spyRl = jest
    .spyOn(readline, 'createInterface')
    .mockImplementation(() => ({
      on: () => {},
      close: () => {},
      question: mockRlQuestion,
      write: mockRlWrite,
    }));

  progressBar.mockImplementation(() => mockedPrimes);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('N can be passed as a command line argument', async () => {
    const N = 123;

    await jest.isolateModules(async () => {
      process.argv = ['', '', '-n', N];
      require('./main');
    });

    expect.assertions(5);
    expect(spyRl).toHaveBeenCalled();
    expect(mockRlQuestion).not.toHaveBeenCalled();
    expect(mockRlWrite).toHaveBeenCalledTimes(3);
    expect(progressBar).toHaveBeenCalledTimes(1);
    expect(progressBar).toHaveBeenCalledWith(N, width);
  });

  test('User is queried for N if not passed as an argument', async () => {
    process.argv = ['', ''];
    await jest.isolateModules(() => {
      require('./main');
    });

    expect.assertions(4);
    expect(mockRlQuestion).toHaveBeenCalled();
    expect(mockRlWrite).toHaveBeenCalledTimes(3);
    expect(progressBar).toHaveBeenCalledTimes(1);
    expect(progressBar).toHaveBeenCalledWith(99, width);
  });

  test('Results are displayed when done', async () => {
    const N = 777;
    await jest.isolateModules(() => {
      process.argv = ['', '', '-n', N];
      require('./main');
    });

    expect.assertions(3);
    expect(mockRlWrite).toHaveBeenNthCalledWith(
      2,
      '\n\x1b[33mResults:\n\x1b[32m'
    );
    expect(mockRlWrite).toHaveBeenLastCalledWith(mockedPrimes.join(', '));
    expect(progressBar).toHaveBeenCalledWith(N, width);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    process.stdout.write('\x1b[0m\x1b[?25h');
  });
});
