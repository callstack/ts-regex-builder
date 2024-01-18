import type { EncodeOutput } from './encoder/types';

/**
 * Sequence of regex elements that can be encoded into a regular expression.
 *
 * Typically passed as an array of elements but can be a single element to
 * improve readability.
 */
export type RegexSequence = RegexElement[] | RegexElement;

/**
 * Represents a result of calling a regex component or a string to be matched
 * literally.
 */
export type RegexElement = RegexComponentResult | string;

/**
 * Represents result of calling a regex componen.
 */
export interface RegexComponentResult {
  type: string;
  encode(): EncodeOutput;
}
