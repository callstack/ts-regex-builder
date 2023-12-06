import type { Any, Digit, Whitespace, Word } from './types';

export function whitespace(): Whitespace {
  return { type: 'whitespace' };
}

export function digit(): Digit {
  return { type: 'digit' };
}

export function word(): Word {
  return { type: 'word' };
}

export function any(): Any {
  return { type: 'any' };
}

export const compilers = {
  whitespace: '\\s',
  digit: '\\d',
  word: '\\w',
  any: '.',
};
