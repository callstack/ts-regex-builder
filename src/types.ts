import type { EncodeResult } from './encoder/types';

/**
 * Sequence of regex elements that can be encoded into a regular expression.
 *
 * Typically passed as an array of elements but can be a single element to
 * improve readability.
 */
export type RegexSequence = RegexElement[] | RegexElement;

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
