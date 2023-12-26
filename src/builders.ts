import type { RegexNode } from './types';
import { encodeSequence } from './encoder/encoder';
import { asNodeArray } from './utils/nodes';
import { optionalFirstArg } from './utils/optional-arg';

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
 * Generate RegExp object from elements.
 *
 * @param elements Single regex element or array of elements
 * @returns
 */
export function buildRegex(elements: RegexNode | RegexNode[]): RegExp;

/**
 * Generate RegExp object from elements with passed flags.
 *
 * @param elements Single regex element or array of elements
 * @param flags RegExp flags object
 * @returns RegExp object
 */
export function buildRegex(
  flags: RegexFlags,
  elements: RegexNode | RegexNode[]
): RegExp;

export function buildRegex(first: any, second?: any): RegExp {
  return _buildRegex(...optionalFirstArg(first, second));
}

export function _buildRegex(
  flags: RegexFlags,
  elements: RegexNode | RegexNode[]
): RegExp {
  const pattern = encodeSequence(asNodeArray(elements)).pattern;
  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

/**
 * Generate regex pattern from elements.
 * @param elements Single regex element or array of elements
 * @returns regex pattern string
 */
export function buildPattern(elements: RegexNode | RegexNode[]): string {
  return encodeSequence(asNodeArray(elements)).pattern;
}

function encodeFlags(flags: RegexFlags): string {
  let result = '';

  if (flags.global) result += 'g';
  if (flags.ignoreCase) result += 'i';
  if (flags.multiline) result += 'm';
  if (flags.hasIndices) result += 'd';
  if (flags.sticky) result += 'y';

  return result;
}
