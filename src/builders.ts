import type { RegexSequence } from './types';
import { encodeSequence } from './encoder/encoder';
import { asNodeArray } from './utils/nodes';

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
 * Generate RegExp object from elements with optional flags.
 *
 * @param elements Single regex element or array of elements
 * @param flags RegExp flags object
 * @returns RegExp object
 */
export function buildRegex(sequence: RegexSequence, flags?: RegexFlags): RegExp {
  const pattern = encodeSequence(asNodeArray(sequence)).pattern;
  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

/**
 * Generate regex pattern from elements.
 * @param elements Single regex element or array of elements
 * @returns regex pattern string
 */
export function buildPattern(sequence: RegexSequence): string {
  return encodeSequence(asNodeArray(sequence)).pattern;
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
