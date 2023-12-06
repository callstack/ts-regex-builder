import type {
  Any,
  CharacterClass,
  Digit,
  RegexElement,
  Whitespace,
  Word,
} from './types';

export const whitespace: Whitespace = { type: 'whitespace' };
export const digit: Digit = { type: 'digit' };
export const word: Word = { type: 'word' };
export const any: Any = { type: 'any' };

export const characterClasses = {
  whitespace: '\\s',
  digit: '\\d',
  word: '\\w',
  any: '.',
} as const satisfies Record<string, string>;

export function isCharacterClass(
  element: Exclude<RegexElement, string>
): element is CharacterClass {
  return element.type in characterClasses;
}
