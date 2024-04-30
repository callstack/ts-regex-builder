import type { EncodeResult } from '../encoder/types';

export const startOfString: EncodeResult = {
  precedence: 'atom',
  pattern: '^',
};

export const endOfString: EncodeResult = {
  precedence: 'atom',
  pattern: '$',
};

export const wordBoundary: EncodeResult = {
  precedence: 'atom',
  pattern: '\\b',
};

export const nonWordBoundary: EncodeResult = {
  precedence: 'atom',
  pattern: '\\B',
};

/**
 * @deprecated Renamed to `nonWordBoundary`.
 */
export const notWordBoundary = nonWordBoundary;
