import type { CharacterClass, CharacterEscape, EncodedRegex } from '../types';
import { ensureText } from '../utils';

/**
 * Creates a character class which matches any one of the given characters.
 *
 * @param elements - Member characters or character ranges.
 * @returns Character class.
 */
export function charClass(...elements: Array<CharacterClass | CharacterEscape>): CharacterClass {
  if (!elements.length) {
    throw new Error('Expected at least one element');
  }

  return {
    chars: elements.map((c) => c.chars).flat(),
    ranges: elements.map((c) => c.ranges ?? []).flat(),
    encode: encodeCharClass,
  };
}

/**
 * Creates a character class which matches any one of the characters in the range.
 *
 * @param start - Start of the range (single character).
 * @param end - End of the range (single character).
 * @returns Character class.
 */
export function charRange(start: string, end: string): CharacterClass {
  if (start.length !== 1 || end.length !== 1) {
    throw new Error(`Expected single characters, but received "${start}" & "${end}"`);
  }

  if (start > end) {
    [start, end] = [end, start];
  }

  return {
    chars: [],
    ranges: [{ start, end }],
    encode: encodeCharClass,
  };
}

/**
 * Creates a character class which matches any one of the given characters.
 *
 * @param chars - Characters to match.
 * @returns Character class.
 */
export function anyOf(chars: string): CharacterClass {
  ensureText(chars);

  return {
    chars: chars.split('').map(escapeChar),
    encode: encodeCharClass,
  };
}

/**
 * Creates a negated character class which matches any character that is not in the given character class.
 *
 * @param element - Character class or character escape to negate.
 * @returns Negated character class.
 */
export function negated(element: CharacterClass | CharacterEscape): EncodedRegex {
  return encodeCharClass.call(element, true);
}

/**
 * @deprecated Renamed to `negated`.
 */
export const inverted = negated;

/** Escape chars for usage inside char class */
function escapeChar(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function encodeCharClass(
  this: CharacterClass | CharacterEscape,
  isNegated?: boolean,
): EncodedRegex {
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
