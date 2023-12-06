import type { Any, Digit, Whitespace, Word } from './types';
import type { CharacterClassCompilerMap } from './types-internal';

export const whitespace: Whitespace = { type: 'whitespace' };

export const digit: Digit = { type: 'digit' };

export const word: Word = { type: 'word' };

export const any: Any = { type: 'any' };

export const compilers = {
  whitespace: '\\s',
  digit: '\\d',
  word: '\\w',
  any: '.',
} satisfies CharacterClassCompilerMap;
