import type { EncodedRegex } from '../types';

export const startOfString: EncodedRegex = {
  type: 'atom',
  pattern: '^',
};

export const endOfString: EncodedRegex = {
  type: 'atom',
  pattern: '$',
};

export const wordBoundary: EncodedRegex = {
  type: 'atom',
  pattern: '\\b',
};

export const nonWordBoundary: EncodedRegex = {
  type: 'atom',
  pattern: '\\B',
};

/**
 * @deprecated Renamed to `nonWordBoundary`.
 */
export const notWordBoundary = nonWordBoundary;
