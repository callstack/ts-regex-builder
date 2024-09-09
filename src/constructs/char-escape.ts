import type { CharacterEscape, EncodedRegex } from '../types';

/**
 * Matches any single character.
 * Specifically this one is NOT a character escape.
 */
export const any: EncodedRegex = {
  type: 'atom',
  pattern: '.',
};

export const digit: CharacterEscape = {
  type: 'atom',
  pattern: '\\d',
  chars: ['\\d'],
};

export const nonDigit: CharacterEscape = {
  type: 'atom',
  pattern: '\\D',
  chars: ['\\D'],
};

export const word: CharacterEscape = {
  type: 'atom',
  pattern: '\\w',
  chars: ['\\w'],
};

export const nonWord: CharacterEscape = {
  type: 'atom',
  pattern: '\\W',
  chars: ['\\W'],
};

export const whitespace: CharacterEscape = {
  type: 'atom',
  pattern: '\\s',
  chars: ['\\s'],
};

export const nonWhitespace: CharacterEscape = {
  type: 'atom',
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
