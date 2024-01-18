import type { EncodeResult } from './encoder/types';

/**
 * Sequence of regex elements (= regex operators or strings to be matched
 * literally) that can be encoded into a regular expression.
 *
 * This can be either a single element or an array of elements.
 */
export type RegexSequence = RegexElement | RegexElement[];

/**
 * Represents a regex operator or a string to be matched literally.
 */
export type RegexElement = RegexOperator | string;

/**
 * Represents regex operator.
 */
export interface RegexOperator {
  type: string;
  encode(): EncodeResult;
}
