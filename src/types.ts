import type { EncodeOutput } from './encoder/types';

/**
 * Sequence of `RegexElements` that can be encoded into a regular expression.
 */
export type RegexSequence = RegexElement[] | RegexElement;

/**
 * Represents a result of calling a regex component (`RegexEncodable`) or a string to be matched literally.
 */
export type RegexElement = RegexEncodable | string;

/**
 * Represents result of calling a regex componen.
 */
export interface RegexEncodable {
  type: string;
  encode(): EncodeOutput;
}
