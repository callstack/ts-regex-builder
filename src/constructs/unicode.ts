import type { CharacterEscape } from '../types';

/**
 * Unicode character code point escape.
 *
 * Regex pattern:
 * - `\uXXXX`: 4-digit hex escape for code points below 0x10000.
 * - `\u{X}`: Unicode code point escape for code points above 0xFFFF.
 *
 * Note: for code points above 0xFFFF, the regex must be [unicode-aware](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).
 *
 * @param codePoint The code point of the character to escape.
 * @returns A character class representing the unicode escape.
 */
export function unicodeChar(codePoint: number): CharacterEscape {
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
    elements: [escape],
  };
}

/**
 * Alias for `unicodeChar`.
 */
export const char = unicodeChar;

/**
 * Unicode property escape matching a set of characters specified by a Unicode property.
 *
 * Regex pattern: `\p{Property}` or `\p{Property=Value}`
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
 *
 * Note: the regex must be [unicode-aware](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).
 *
 * @param property Unicode property name.
 * @param value Unicode property value (optional).
 * @returns A character class representing the unicode property escape.
 */
export function unicodeProperty(property: string, value?: string): CharacterEscape {
  const escape = `\\p{${property}${value ? `=${value}` : ''}}`;

  return {
    precedence: 'atom',
    pattern: escape,
    elements: [escape],
  };
}
