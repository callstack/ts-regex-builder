import type { EncodeResult } from './encoder/types';

export type ArrayOrSingle<T> = T[] | T;

/**
 * Sequence of regex elements forming a regular expression.
 *
 * For developer convenience it also accepts a single element instead of array.
 */
export type RegexSequence = RegexElement[] | RegexElement;

/**
 * Fundamental building block of a regular expression, defined as either a regex construct or a string.
 */
export type RegexElement = RegexConstruct | string;

/**
 * Common interface for all regex constructs like character classes, quantifiers, and anchors.
 */
export interface RegexConstruct {
  type: string;
  encode(): EncodeResult;
}

export interface RegexFlags {
  /** Find all matches in a string, instead of just the first one. */
  global?: boolean;

  /** Perform case-insensitive matching. */
  ignoreCase?: boolean;

  /** Treat the start and end of each line in a string as the beginning and end of the string. */
  multiline?: boolean;

  /** Penerate the start and end indices of each captured group in a match. */
  hasIndices?: boolean;
}
