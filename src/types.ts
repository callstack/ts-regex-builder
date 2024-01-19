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
