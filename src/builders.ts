import type { RegexElement } from './types';
import { encodeSequence } from './encoder';
import { isValidElement } from './utils';

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
export function buildRegex(...elements: Array<RegexElement | string>): RegExp;
export function buildRegex(
  flags: RegexFlags,
  ...elements: Array<RegexElement | string>
): RegExp;
export function buildRegex(
  first: RegexFlags | RegexElement | string,
  ...rest: Array<RegexElement | string>
): RegExp {
  if (typeof first === 'string' || isValidElement(first)) {
    return buildRegex({}, first, ...rest);
  }

  const pattern = encodeSequence(rest).pattern;
  const flags = encodeFlags(first);
  return new RegExp(pattern, flags);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(
  ...elements: Array<RegexElement | string>
): string {
  return encodeSequence(elements).pattern;
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
