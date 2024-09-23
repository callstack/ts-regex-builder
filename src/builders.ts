import type { RegexFlags, RegexSequence } from './types';
import { encode } from './encoder';

/**
 * Generate RegExp object from elements with optional flags.
 *
 * @param elements Single regex element or array of elements
 * @param flags RegExp flags object
 * @returns RegExp object
 */
export function buildRegExp(sequence: RegexSequence, flags?: RegexFlags): RegExp | undefined {
  const pattern = encode(sequence)?.pattern;
  if (!pattern) {
    return undefined;
  }

  ensureUnicodeFlagIfNeeded(pattern, flags);

  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

/**
 * Generate regex pattern from elements.
 * @param elements Single regex element or array of elements
 * @returns regex pattern string
 */
export function buildPattern(sequence: RegexSequence): string | undefined {
  return encode(sequence)?.pattern;
}

function encodeFlags(flags: RegexFlags): string {
  let result = '';

  if (flags.global) result += 'g';
  if (flags.ignoreCase) result += 'i';
  if (flags.multiline) result += 'm';
  if (flags.hasIndices) result += 'd';
  if (flags.dotAll) result += 's';
  if (flags.sticky) result += 'y';
  if (flags.unicode) result += 'u';

  return result;
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
