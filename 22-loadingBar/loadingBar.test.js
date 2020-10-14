jest.mock('readline');
const readline = require('readline');
const loadingBar = require('./loadingBar');

describe('loadingBar', () => {
  let mockedTerminal = '';
  let terminalPosition = 0;
  let timeout = '';

  const spyWrite = jest
    .spyOn(process.stdout, 'write')
    .mockName('write')
    .mockImplementation(char => {
      if (!char.includes('\x1b')) {
        mockedTerminal =
          mockedTerminal.slice(0, terminalPosition) +
          char +
          mockedTerminal.slice(terminalPosition + 1);
      }
    });
  const spyCursorTo = jest
    .spyOn(readline, 'cursorTo')
    .mockName('cursorTo')
    .mockImplementation((_stream, x) => {
      terminalPosition = x;
    });

  jest.useFakeTimers();

  beforeEach(() => {
    mockedTerminal = '';
    terminalPosition = 0;
    jest.clearAllMocks();
    clearInterval(timeout);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    clearInterval(timeout);
    process.stdout.write('\x1b[0m\x1b[?25h');
  });

  test('loading bar is initialized at time 0', () => {
    const expectedBar = '[########################------------------------]';
    timeout = loadingBar();

    expect(mockedTerminal).toEqual(expectedBar);
    expect(spyWrite).toHaveBeenLastCalledWith(expectedBar);
    expect(spyWrite).toHaveBeenCalledTimes(2);
    expect(spyCursorTo).toHaveBeenCalledTimes(0);
  });

  test('loading bar is updated each interval', () => {
    let expectedBar = '[########################------------------------]';
    const timerTime = 20;
    timeout = loadingBar();

    jest.advanceTimersByTime(timerTime);

    expectedBar = `[-########################-----------------------]`;

    expect(mockedTerminal).toEqual(expectedBar);
    expect(spyWrite).toHaveBeenLastCalledWith('#');
    expect(spyWrite).toHaveBeenCalledTimes(4);
    expect(readline.cursorTo).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timerTime * 4);

    expectedBar = `[-----########################-------------------]`;
    expect(mockedTerminal).toEqual(expectedBar);
    expect(spyWrite).toHaveBeenCalledTimes(12);
    expect(readline.cursorTo).toHaveBeenCalledTimes(10);

    jest.advanceTimersByTime(timerTime * 25);

    expectedBar = `[######------------------------##################]`;
    expect(mockedTerminal).toEqual(expectedBar);
  });

  test('bar size can be customized', () => {
    const expectedSize = Math.min(process.stdout.columns, 80);
    timeout = loadingBar({ size: expectedSize });
    expect(mockedTerminal.length).toEqual(expectedSize);
  });

  test('interval time can be customized', () => {
    const timerTime = 500;
    timeout = loadingBar({ size: 0, time: timerTime });

    expect(mockedTerminal).toEqual('[##--]');

    jest.advanceTimersByTime(100);
    expect(mockedTerminal).toEqual('[##--]');

    jest.advanceTimersByTime(400);
    expect(mockedTerminal).toEqual('[-##-]');

    jest.advanceTimersByTime(500);
    expect(mockedTerminal).toEqual('[--##]');

    jest.advanceTimersByTime(500);
    expect(mockedTerminal).toEqual('[#--#]');

    jest.advanceTimersByTime(500);
    expect(mockedTerminal).toEqual('[##--]');
  });

  test('foreground and background symbols can be customized', () => {
    const foreground = '1';
    const background = '000';
    timeout = loadingBar({ size: 200, foreground, background });

    expect(mockedTerminal.length).toEqual(80);
    expect(mockedTerminal[0]).toEqual('[');
    expect(mockedTerminal[1]).toEqual(foreground);
    expect(mockedTerminal[mockedTerminal.length - 2]).toEqual(background[0]);
    expect(mockedTerminal[mockedTerminal.length - 1]).toEqual(']');
  });

  test('bar color can be customized', () => {
    timeout = loadingBar({ size: 10, color: 'red' });
    expect(mockedTerminal.length).toEqual(10);
    // first call changes the color
    expect(spyWrite.mock.calls[0][0]).toEqual('\x1b[31m');
    // second call hides the cursor
    expect(spyWrite.mock.calls[1][0]).toEqual('\x1b[?25l');

    clearInterval(timeout);
    spyWrite.mockClear();
    timeout = loadingBar({ color: 'blue' });
    expect(spyWrite.mock.calls[0][0]).toEqual('\x1b[34m');

    clearInterval(timeout);
    spyWrite.mockClear();
    timeout = loadingBar({ color: 'magenta' });
    expect(spyWrite.mock.calls[0][0]).toEqual('\x1b[35m');

    clearInterval(timeout);
    spyWrite.mockClear();
    timeout = loadingBar({ color: 'fakecolor' });
    expect(spyWrite.mock.calls[0][0]).toEqual('\x1b[?25l');
  });
});
