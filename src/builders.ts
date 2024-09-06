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
  const flagsString = encodeFlags(flags ?? {});

  if (!flags?.unicode) {
    const unicodeModePattern = getUnicodeModePattern(pattern);
    if (unicodeModePattern) {
      throw new Error(
        `The pattern "${unicodeModePattern}" requires Unicode-aware mode. Please ensure the "unicode" flag is set.`,
      );
    }
  }

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

const unicodeModePatterns = /(?:\\u|\\p|\\P)\{.+?\}/;

function getUnicodeModePattern(pattern: string): string | null {
  const match = pattern.match(unicodeModePatterns);
  return match?.[0] ?? null;
}
