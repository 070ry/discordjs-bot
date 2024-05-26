const { stdout } = require('process');
const { info, warn, error } = console;

/**
 * Settings for the color of log messages
 */
const colors = {
  info: '\x1b[34m', // blue
  warn: '\x1b[33m', // yellow
  error: '\x1b[31m', // red
  reset: '\x1b[0m', // reset
};

/**
 * Formats a log message with the specified level
 * @param {string} level - Log level (info, warn, error)
 * @param {string} message - Log message
 * @returns {string} - Formatted log message
 */
function format(level, message) {
  return `${colors[level]}[ ${level} ] ${message}${colors.reset}`;
}

/**
 * Module that exports functions for outputting log messages
 * @module Logger
 */
module.exports = {
  /**
   * Outputs a log message to standard output
   * @param {string} message - Log message
   */
  log: message => stdout.write(`${message}\n`),

  /**
   * Outputs an info log message
   * @param {string} message - Log message
   */
  info: message => info(format('info', message)),

  /**
   * Outputs an error log message
   * @param {string} message - Log message
   */
  error: message => error(format('error', message)),

  /**
   * Outputs a warning log message
   * @param {string} message - Log message
   */
  warn: message => warn(format('warn', message)),
};
