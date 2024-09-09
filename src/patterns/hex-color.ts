import { buildRegExp } from '../builders';
import { endOfString, startOfString, wordBoundary } from '../constructs/anchors';
import { choiceOf } from '../constructs/choice-of';
import { repeat } from '../constructs/repeat';

const hexDigit = /[0-9a-f]/;

/** Find hex color strings in a text. */
export const hexColorFinder = buildRegExp(
  [
    '#',
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
    wordBoundary,
  ],
  { ignoreCase: true, global: true },
);

/**
 * Check that given text is a valid hex color.
 *
 * Allows both 3 and 6 digit hex colors.
 * */
export const hexColorValidator = buildRegExp(
  [
    startOfString, // Match whole string
    '#',
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
    endOfString,
  ],
  { ignoreCase: true },
);
