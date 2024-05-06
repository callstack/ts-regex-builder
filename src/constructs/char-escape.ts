import type { CharacterEscape, EncodedRegex } from '../types';

/**
 * Matches any single character.
 * Specifically this one is NOT a character escape.
 */
export const any: EncodedRegex = {
  precedence: 'atom',
  pattern: '.',
};

export const digit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\d',
  chars: ['\\d'],
};

export const nonDigit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\D',
  chars: ['\\D'],
};

export const word: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\w',
  chars: ['\\w'],
};

export const nonWord: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\W',
  chars: ['\\W'],
};

export const whitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\s',
  chars: ['\\s'],
};

export const nonWhitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\S',
  chars: ['\\S'],
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
