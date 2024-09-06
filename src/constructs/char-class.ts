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
  const chars = characters.split('').map((c) => escapeCharClass(c));

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

function escapeCharClass(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Unicode character escape.
 *
 * Regex pattern:
 * - `\uXXXX`: 4-digit hex escape for code points below 0x10000.
 * - `\u{X}`: Unicode code point escape for code points above 0xFFFF.
 *
 * Note: for code points above 0xFFFF, the regex engine must be [unicode-aware](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).
 *
 * @param codePoint The code point of the character to escape.
 * @returns A character class representing the unicode escape.
 */
export function charCode(codePoint: number): CharacterEscape {
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
    throw new RangeError(`Expected a valid unicode code point but received ${codePoint}`);
  }

  let escape =
    codePoint < 0x10000
      ? `\\u${codePoint.toString(16).padStart(4, '0')}` // 4-digit hex (works in all modes)
      : `\\u{${codePoint.toString(16)}}`; // 1-6 digit hex (requires unicode-aware mode)

  return {
    precedence: 'atom',
    pattern: escape,
    chars: [escape],
  };
}

/**
 * Unicode character class escape matching a set of characters specified by a Unicode property.
 *
 * Regex pattern: `\p{Property}` or `\p{Property=Value}`
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
 *
 * @param property Unicode property name.
 * @param value Unicode property value (optional).
 * @returns A character class representing the unicode property escape.
 */
export function charProperty(property: string, value?: string): CharacterEscape {
  const escape = `\\p{${property}${value ? `=${value}` : ''}}`;

  return {
    precedence: 'atom',
    pattern: escape,
    chars: [escape],
  };
}
