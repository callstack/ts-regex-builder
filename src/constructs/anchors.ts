import type { EncodedRegex } from '../types';

/**
 * Start of string anchor. Matches the start of of string. In `multiline` mode, also matches immediately following a newline.
 */
export const startOfString: EncodedRegex = {
  precedence: 0,
  pattern: '^',
};

/**
 * End of string anchor. Matches the end of a string. In `multiline` mode, also matches immediately preceding a newline.
 */
export const endOfString: EncodedRegex = {
  precedence: 0,
  pattern: '$',
};

/**
 * Word boundary anchor. Matches the position where one side is a word character (alphanumeric or underscore) and the other side is a non-word character (anything else).
 */
export const wordBoundary: EncodedRegex = {
  precedence: 0,
  pattern: '\\b',
};

/**
 * Non-word boundary anchor. Matches the position where both sides are word characters.
 */
export const nonWordBoundary: EncodedRegex = {
  precedence: 0,
  pattern: '\\B',
};

/**
 * @deprecated Renamed to `nonWordBoundary`.
 */
export const notWordBoundary = nonWordBoundary;
