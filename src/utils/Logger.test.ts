import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { LogDestination } from './Logger';

const loadLoggerModule = () => import('./Logger');

describe('Logger', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('logs messages to enabled console destination when level is log', async () => {
    const logSpy = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(logSpy);

    const { Logger, LogLevel, DestinationName } = await loadLoggerModule();
    const logger = new Logger({
      destinations: [DestinationName.Console],
      level: LogLevel.Log,
    });

    logger.log('hello', 'world');

    expect(logSpy).toHaveBeenCalledWith('hello', 'world');
  });

  test('error logging works at error level while log output is suppressed', async () => {
    const logSpy = vi.fn();
    const errorSpy = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(logSpy);
    vi.spyOn(console, 'error').mockImplementation(errorSpy);

    const { Logger, LogLevel, DestinationName } = await loadLoggerModule();
    const logger = new Logger({
      destinations: [DestinationName.Console],
      level: LogLevel.Log,
    });

    logger.setLevel(LogLevel.Error);
    logger.log('should not log');

    expect(logSpy).not.toHaveBeenCalled();

    logger.error('failure', 'details');

    expect(errorSpy).toHaveBeenCalledWith('failure', 'details');
  });

  test('debug logging only fires when level is set to debug', async () => {
    const logSpy = vi.fn();
    const debugSpy = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(logSpy);
    vi.spyOn(console, 'debug').mockImplementation(debugSpy);

    const { Logger, LogLevel, DestinationName } = await loadLoggerModule();
    const logger = new Logger({
      destinations: [DestinationName.Console],
      level: LogLevel.Log,
    });

    logger.debug('no output expected');
    expect(debugSpy).not.toHaveBeenCalled();

    logger.setLevel(LogLevel.Debug);
    logger.debug('debug message');

    expect(debugSpy).toHaveBeenCalledWith('debug message');

    logger.log('suppressed at debug level');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('enable and disable destination methods control output routing', async () => {
    const logSpy = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(logSpy);

    const { Logger, LogLevel, DestinationName } = await loadLoggerModule();
    const logger = new Logger({
      destinations: [DestinationName.Console],
      level: LogLevel.Log,
    });

    logger.disableDestination(DestinationName.Console);
    logger.log('disabled output');

    expect(logSpy).not.toHaveBeenCalled();
    expect(logger.getEnabledDestinations()).not.toContain('console');

    logger.enableDestination(DestinationName.Console);
    logger.log('enabled output');

    expect(logSpy).toHaveBeenCalledWith('enabled output');
    expect(logger.getEnabledDestinations()).toContain('console');
  });

  test('custom destinations receive log, error, and debug messages when enabled', async () => {
    const customLog = vi.fn();
    const customError = vi.fn();
    const customDebug = vi.fn();

    const { Logger, LogLevel } = await loadLoggerModule();

    const customDestination: LogDestination = {
      log: customLog,
      error: customError,
      debug: customDebug,
      name: 'custom',
      enabled: true,
      supportsBrowser: true,
    };

    const logger = new Logger({
      level: LogLevel.Log,
      customDestinations: [customDestination],
    });

    logger.log('hello custom', 'param');
    expect(customLog).toHaveBeenCalledWith('hello custom', 'param');

    logger.error('error custom');
    expect(customError).toHaveBeenCalledWith('error custom');

    logger.setLevel(LogLevel.Debug);
    logger.debug('debug custom');

    expect(customDebug).toHaveBeenCalledWith('debug custom');
    expect(logger.getEnabledDestinations()).toContain('custom');
  });
});
