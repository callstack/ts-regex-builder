import type { CharacterEscape, EncodedRegex } from '../types';

/**
 * Matches any single character.
 * Specifically this one is NOT a character escape.
 */
export const any: EncodedRegex = {
  precedence: 'atom',
  pattern: '.',
};

/**
 * Matches any digit (0-9).
 */
export const digit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\d',
  elements: ['\\d'],
};

/**
 * Matches any non-digit (0-9) character.
 */
export const nonDigit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\D',
  elements: ['\\D'],
};

/**
 * Matches any word character (alphanumeric or underscore).
 */
export const word: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\w',
  elements: ['\\w'],
};

/**
 * Matches any non-word (alphanumeric or underscore) character.
 */
export const nonWord: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\W',
  elements: ['\\W'],
};

/**
 * Matches any whitespace character (space, tab, newline, etc.).
 */
export const whitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\s',
  elements: ['\\s'],
};

/**
 * Matches any non-whitespace (space, tab, newline, etc.) character.
 */
export const nonWhitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\S',
  elements: ['\\S'],
};

/**
 * @deprecated Renamed to `nonDigit`.
 */
export const notDigit = nonDigit;

/**
 * @deprecated Renamed to `nonWord`.
 */
export const notWord = nonWord;

/**
 * @deprecated Renamed to `nonWhitespace`.
 */
export const notWhitespace = nonWhitespace;
