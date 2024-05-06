import { encodeCharClass } from '../encoder';
import type { CharacterClass, CharacterEscape, EncodedRegex } from '../types';

export function charClass(...elements: Array<CharacterClass | CharacterEscape>): CharacterClass {
  if (!elements.length) {
    throw new Error('`charClass` should receive at least one element');
  }

  return {
    chars: elements.map((c) => c.chars).flat(),
    ranges: elements.map((c) => c.ranges ?? []).flat(),
  };
}

export function charRange(start: string, end: string): CharacterClass {
  if (start.length !== 1) {
    throw new Error('`charRange` should receive only single character `start` string');
  }

  if (end.length !== 1) {
    throw new Error('`charRange` should receive only single character `end` string');
  }

  if (start > end) {
    throw new Error('`start` should be before or equal to `end`');
  }

  return {
    chars: [],
    ranges: [{ start, end }],
  };
}

export function anyOf(characters: string): CharacterClass {
  const chars = characters.split('').map((c) => escapeForCharacterClass(c));

  if (chars.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    chars,
  };
}

export function negated(element: CharacterClass | CharacterEscape): EncodedRegex {
  return encodeCharClass(element, true);
}

/**
 * @deprecated Renamed to `negated`.
 */
export const inverted = negated;

function escapeForCharacterClass(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}
