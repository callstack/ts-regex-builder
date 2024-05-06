import type { EncodeResult } from '../encoder/types';
import type { RegexConstruct } from '../types';
import type { CharacterEscape } from './char-escape';

/**
 * Character range from start to end (inclusive).
 */
export interface CharacterRange {
  start: string;
  end: string;
}

export interface CharacterClass extends RegexConstruct {
  type: 'characterClass';
  chars: string[];
  ranges?: CharacterRange[];
}

export function charClass(...elements: Array<CharacterClass | CharacterEscape>): CharacterClass {
  return {
    type: 'characterClass',
    chars: elements.map((c) => c.chars).flat(),
    ranges: elements.map((c) => c.ranges ?? []).flat(),
    encode: encodeCharacterClass,
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
    type: 'characterClass',
    chars: [],
    ranges: [{ start, end }],
    encode: encodeCharacterClass,
  };
}

export function anyOf(characters: string): CharacterClass {
  const chars = characters.split('').map((c) => escapeForCharacterClass(c));

  if (chars.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    chars,
    encode: encodeCharacterClass,
  };
}

export function negated(element: CharacterClass | CharacterEscape): EncodeResult {
  return encodeCharacterClass.call(element, true);
}

/**
 * @deprecated Renamed to `negated`.
 */
export const inverted = negated;

export function encodeCharacterClass(
  this: CharacterClass | CharacterEscape,
  isNegated?: boolean,
): EncodeResult {
  if (!this.chars.length && !this.ranges?.length) {
    throw new Error('Character class should contain at least one character or character range');
  }

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphen = this.chars.includes('-') ? '-' : '';
  const caret = this.chars.includes('^') ? '^' : '';
  const otherChars = this.chars.filter((c) => c !== '-' && c !== '^').join('');
  const ranges = this.ranges?.map(({ start, end }) => `${start}-${end}`).join('') ?? '';
  const negation = isNegated ? '^' : '';

  let pattern = `[${negation}${ranges}${otherChars}${caret}${hyphen}]`;
  if (pattern === '[^-]') pattern = '[\\^-]';

  return {
    precedence: 'atom',
    pattern,
  };
}

function escapeForCharacterClass(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}
