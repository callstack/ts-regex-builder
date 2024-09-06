import type { CharacterEscape, EncodedRegex } from '../types';

/**
 * Matches any single character.
 * Specifically this one is NOT a character escape.
 */
export const any: EncodedRegex = {
  precedence: 'atom',
  pattern: '.',
};

export const digit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\d',
  chars: ['\\d'],
};

export const nonDigit: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\D',
  chars: ['\\D'],
};

export const word: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\w',
  chars: ['\\w'],
};

export const nonWord: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\W',
  chars: ['\\W'],
};

export const whitespace: CharacterEscape = {
  precedence: 'atom',
  pattern: '\\s',
  chars: ['\\s'],
};

export const nonWhitespace: CharacterEscape = {
  precedence: 'atom',
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
export function char(codePoint: number): CharacterEscape {
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
 * Unicode character property name escape matching a set of characters specified by a Unicode property.
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
export function charProperty(property: string, value?: string): CharacterEscape {
  const escape = `\\p{${property}${value ? `=${value}` : ''}}`;

  return {
    precedence: 'atom',
    pattern: escape,
    chars: [escape],
  };
}
