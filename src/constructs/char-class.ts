import type { CharacterClass, CharacterEscape, EncodedRegex } from '../types';
import { ensureText } from '../utils';

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

export function charRange(start: string, end: string): CharacterClass {
  if (start.length !== 1 || end.length !== 1) {
    throw new Error(`Expected a single characters, received "${start}" & "${end}"`);
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

export function anyOf(chars: string): CharacterClass {
  ensureText(chars);

  return {
    chars: chars.split('').map(escapeChar),
    encode: encodeCharClass,
  };
}

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

export function encodeCharClass(
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
