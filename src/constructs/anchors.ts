import type { EncodedRegex } from '../encoder/types';

export const startOfString: EncodedRegex = {
  precedence: 'atom',
  pattern: '^',
};

export const endOfString: EncodedRegex = {
  precedence: 'atom',
  pattern: '$',
};

export const wordBoundary: EncodedRegex = {
  precedence: 'atom',
  pattern: '\\b',
};

export const nonWordBoundary: EncodedRegex = {
  precedence: 'atom',
  pattern: '\\B',
};

/**
 * @deprecated Renamed to `nonWordBoundary`.
 */
export const notWordBoundary = nonWordBoundary;
