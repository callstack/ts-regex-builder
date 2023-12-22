import type { RegexElement } from './components/types';
import { encodeSequence } from './encoder/encoder';
import { toArray } from './utils';

export interface RegexFlags {
  /** Global search. */
  global?: boolean;
  /** Case-insensitive search. */
  ignoreCase?: boolean;
  /** Allows ^ and $ to match newline characters. */
  multiline?: boolean;
  /** Generate indices for substring matches. */
  hasIndices?: boolean;
  /** Perform a "sticky" search that matches starting at the current position in the target string. */
  sticky?: boolean;
}

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(
  elements: RegexElement | RegexElement[],
  flags?: RegexFlags
): RegExp {
  const pattern = encodeSequence(toArray(elements)).pattern;
  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(elements: RegexElement | RegexElement[]): string {
  return encodeSequence(toArray(elements)).pattern;
}

function encodeFlags(flags: RegexFlags): string {
  let result = '';
  if (flags.global) {
    result += 'g';
  }
  if (flags.ignoreCase) {
    result += 'i';
  }
  if (flags.multiline) {
    result += 'm';
  }
  if (flags.hasIndices) {
    result += 'd';
  }
  if (flags.sticky) {
    result += 'y';
  }

  return result;
}
