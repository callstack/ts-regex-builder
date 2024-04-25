import { type CharacterClass, encodeCharacterClass } from './character-class';

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
export function unicodeChar(codePoint: number): CharacterClass {
  if (!Number.isInteger(codePoint)) {
    throw new TypeError('Expected an integer code point but got: ' + codePoint);
  }

  if (codePoint < 0) {
    throw new RangeError('Code point must be a positive integer but got: ' + codePoint);
  }

  let escape =
    codePoint < 0x10000
      ? `\\u${codePoint.toString(16).padStart(4, '0')}` // 4-digit hex (works in all modes)
      : `\\u{${codePoint.toString(16)}}`; // 1-6 digit hex (requires unicode-aware mode)

  return {
    type: 'characterClass',
    escape,
    encode: encodeCharacterClass,
  };
}

/**
 * Unicode character class escape matching a set of characters specified by a Unicode property.
 *
 * Regex pattern: `\p{Property}` or `\p{Property=Value}`
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
 *
 * @param prop Unicode property name.
 * @param value Unicode property value (optional).
 * @returns A character class representing the unicode property escape.
 */
export function unicodeProp(prop: string, value?: string): CharacterClass {
  return {
    type: 'characterClass',
    escape: `\\p{${prop}${value ? `=${value}` : ''}}`,
    encode: encodeCharacterClass,
  };
}
