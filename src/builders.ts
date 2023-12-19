import type { RegexComponent } from './types';
import { encodeSequence } from './encoder';
import { isRegexElement } from './utils';

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
export function buildRegex(...elements: Array<RegexComponent | string>): RegExp;
export function buildRegex(
  flags: RegexFlags,
  ...elements: Array<RegexComponent | string>
): RegExp;
export function buildRegex(
  first: RegexFlags | RegexComponent | string,
  ...rest: Array<RegexComponent | string>
): RegExp {
  if (typeof first === 'string' || isRegexElement(first)) {
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
  ...elements: Array<RegexComponent | string>
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
