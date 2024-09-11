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
  parts: ['\\d'],
};

/**
 * Matches any non-digit (0-9) character.
 */
export const nonDigit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\D',
  parts: ['\\D'],
};

/**
 * Matches any word character (alphanumeric or underscore).
 */
export const word: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\w',
  parts: ['\\w'],
};

/**
 * Matches any non-word (alphanumeric or underscore) character.
 */
export const nonWord: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\W',
  parts: ['\\W'],
};

/**
 * Matches any whitespace character (space, tab, newline, etc.).
 */
export const whitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\s',
  parts: ['\\s'],
};

/**
 * Matches any non-whitespace (space, tab, newline, etc.) character.
 */
export const nonWhitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\S',
  parts: ['\\S'],
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
