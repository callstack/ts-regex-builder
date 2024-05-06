import type { EncodeResult } from '../encoder/types';

export interface CharacterEscape extends EncodeResult {
  kind: 'escape';
  chars: string[];
  ranges?: undefined;
  isNegated?: undefined;
}

/**
 * Matches any single character.
 * Specifically this one is NOT a character escape.
 */
export const any: EncodeResult = {
  precedence: 'atom',
  pattern: '.',
};

export const digit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\d',
  chars: ['\\d'],
  kind: 'escape',
};

export const nonDigit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\D',
  chars: ['\\D'],
  kind: 'escape',
};

export const word: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\w',
  chars: ['\\w'],
  kind: 'escape',
};

export const nonWord: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\W',
  chars: ['\\W'],
  kind: 'escape',
};

export const whitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\s',
  chars: ['\\s'],
  kind: 'escape',
};

export const nonWhitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\S',
  chars: ['\\S'],
  kind: 'escape',
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
