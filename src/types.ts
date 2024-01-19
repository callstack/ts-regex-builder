import type { EncodeResult } from './encoder/types';

export type ArrayOrSingle<T> = T[] | T;

/**
 * Sequence of regex elements that can be encoded as a regular expression.
 *
 * This can be either an array of elements or a single element.
 */
export type RegexSequence = RegexElement[] | RegexElement;

/**
 * Represents a part of regex. Can be either a regex construct or a string to be
 * matched literally.
 */
export type RegexElement = RegexConstruct | string;

/**
 * Represents regex components such as character classes, quantifiers, anchors, etc.
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
