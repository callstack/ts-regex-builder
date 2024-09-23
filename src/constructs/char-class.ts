import type { CharacterClass, CharacterEscape, EncodedRegex } from '../types';

/**
 * Creates a character class which matches any one of the given characters.
 *
 * @param elements - Member characters or character ranges.
 * @returns Character class.
 */
export function charClass(
  ...elements: Array<CharacterClass | CharacterEscape | null>
): CharacterClass | null {
  const allElements = elements.flatMap((c) => c?.elements).filter((c) => c != null);
  if (allElements.length === 0) {
    return null;
  }

  return {
    elements: allElements,
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
    elements: [`${start}-${end}`],
    encode: encodeCharClass,
  };
}

/**
 * Creates a character class which matches any one of the given characters.
 *
 * @param chars - Characters to match.
 * @returns Character class.
 */
export function anyOf(chars: string): CharacterClass | null {
  return {
    elements: chars.split('').map(escapeChar),
    encode: encodeCharClass,
  };
}

/**
 * Creates a negated character class which matches any character that is not in the given character class.
 *
 * @param element - Character class or character escape to negate.
 * @returns Negated character class.
 */
export function negated(element: CharacterClass | CharacterEscape): EncodedRegex | null {
  return encodeCharClass.call(element, true);
}

/**
 * @deprecated Renamed to `negated`.
 */
export const inverted = negated;

/** Escape chars for usage inside char class */
function escapeChar(text: string): string {
  // anyOf(']-\\^')
  return text.replace(/[\]\-\\^]/g, '\\$&'); // "$&" is whole matched string
}

function encodeCharClass(
  this: CharacterClass | CharacterEscape,
  isNegated?: boolean,
): EncodedRegex | null {
  if (this.elements.length === 0) {
    return null;
  }

  return {
    precedence: 'atom',
    pattern: `[${isNegated ? '^' : ''}${this.elements.join('')}]`,
  };
}
