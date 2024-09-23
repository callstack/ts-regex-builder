import type { RegexFlags, RegexSequence } from './types';
import { encode } from './encoder';

/**
 * Generate RegExp object from elements with optional flags.
 *
 * @param elements Single regex element or array of elements
 * @param flags RegExp flags object
 * @returns RegExp object
 */
export function buildRegExp(sequence: RegexSequence, flags?: RegexFlags): RegExp {
  const pattern = encode(sequence).pattern;
  ensureUnicodeFlagIfNeeded(pattern, flags);

  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

/**
 * Generate regex pattern from elements.
 * @param elements Single regex element or array of elements
 * @returns regex pattern string
 */
export function buildPattern(sequence: RegexSequence): string {
  return encode(sequence).pattern;
}

const flagsMap: Record<keyof RegexFlags, string> = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  hasIndices: 'd',
  dotAll: 's',
  sticky: 'y',
  unicode: 'u',
};

function encodeFlags(flags: RegexFlags): string {
  return Object.entries(flags)
    .filter(([, value]) => value)
    .map(([key]) => flagsMap[key as keyof RegexFlags])
    .join('');
}

// Matches unicode mode patterns: \u{...}, \p{...}, \P{...}, but avoids valid \\u{...}, etc
const unicodeModePatterns = /(?<!\\)(?:\\u|\\[pP])\{.+?\}/;

function ensureUnicodeFlagIfNeeded(pattern: string, flags: RegexFlags | undefined) {
  if (flags?.unicode) {
    return;
  }

  const match = pattern.match(unicodeModePatterns);
  if (match) {
    throw new Error(`Pattern "${match?.[0]}" requires "unicode" flag to be set.`);
  }
}
