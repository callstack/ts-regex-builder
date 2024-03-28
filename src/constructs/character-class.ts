import type { EncodeResult } from '../encoder/types';
import type { RegexConstruct } from '../types';

export interface CharacterClass extends RegexConstruct {
  type: 'characterClass';
  escape?: string;
  chars: string[];
  ranges: CharacterRange[];
  isNegated: boolean;
  encode: () => EncodeResult;
}

/**
 * Character range from start to end (inclusive).
 */
export interface CharacterRange {
  start: string;
  end: string;
}

export const any: CharacterClass = {
  type: 'characterClass',
  escape: '.',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  escape: '\\d',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const nonDigit: CharacterClass = {
  type: 'characterClass',
  escape: '\\D',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const word: CharacterClass = {
  type: 'characterClass',
  escape: '\\w',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const nonWord: CharacterClass = {
  type: 'characterClass',
  escape: '\\W',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  escape: '\\s',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

export const nonWhitespace: CharacterClass = {
  type: 'characterClass',
  escape: '\\S',
  chars: [],
  ranges: [],
  isNegated: false,
  encode: encodeCharacterClass,
};

/**
 * @deprecated Renamed to `nonDigit`.
 */
export const notDigit = nonDigit;

/**
 * @deprecated Renamed to `nonWord`.
 */
export const notWord = nonWord;

/**
 * @deprecated Renamed to `nonWhitespace`.
 */
export const notWhitespace = nonWhitespace;

export function charClass(...elements: CharacterClass[]): CharacterClass {
  return union(elements, charClass.name);
}

export function charRange(start: string, end: string): CharacterClass {
  if (start.length !== 1) {
    throw new Error('`charRange` should receive only single character `start` string');
  }

  if (end.length !== 1) {
    throw new Error('`charRange` should receive only single character `end` string');
  }

  if (start > end) {
    throw new Error('`start` should be before or equal to `end`');
  }

  return {
    type: 'characterClass',
    chars: [],
    ranges: [{ start, end }],
    isNegated: false,
    encode: encodeCharacterClass,
  };
}

export function anyOf(characters: string): CharacterClass {
  const chars = characters.split('').map((c) => escapeForCharacterClass(c));

  if (chars.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    chars,
    ranges: [],
    isNegated: false,
    encode: encodeCharacterClass,
  };
}

export function negated(...classes: CharacterClass[]): CharacterClass {
  const x = negated;
  x.name;
  const unionClass = union(classes, negated.name);

  return {
    type: 'characterClass',
    chars: unionClass.chars,
    ranges: unionClass.ranges,
    isNegated: !unionClass.isNegated,
    encode: encodeCharacterClass,
  };
}

/**
 * @deprecated Renamed to `negated`.
 */
export const inverted = negated;

function encodeCharacterClass(this: CharacterClass): EncodeResult {
  if (this.escape === undefined && this.chars.length === 0 && this.ranges.length === 0) {
    throw new Error('Character class should contain at least one character or character range');
  }

  // Direct rendering for single-character class
  if (this.escape !== undefined && !this.chars.length && !this.ranges.length && !this.isNegated) {
    return {
      precedence: 'atom',
      pattern: this.escape,
    };
  }

  const allChars = getAllChars(this);

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphen = allChars.includes('-') ? '-' : '';
  const caret = allChars.includes('^') ? '^' : '';
  const otherChars = allChars.filter((c) => c !== '-' && c !== '^').join('');
  const ranges = this.ranges.map(({ start, end }) => `${start}-${end}`).join('');
  const negation = this.isNegated ? '^' : '';

  let pattern = `[${negation}${ranges}${otherChars}${caret}${hyphen}]`;
  if (pattern === '[^-]') pattern = '[\\^-]';

  return {
    precedence: 'atom',
    pattern,
  };
}

function union(classes: CharacterClass[], fnName: string): CharacterClass {
  const negatedCount = classes.filter((c) => c.isNegated).length;
  if (negatedCount !== 0 && negatedCount !== classes.length) {
    throw new Error(
      `"${fnName}": either all character classes should be negated or none of them should be negated`,
    );
  }

  if (classes.length === 1) {
    return classes[0]!;
  }

  return {
    type: 'characterClass',
    chars: classes.map((c) => getAllChars(c)).flat(),
    ranges: classes.map((c) => c.ranges).flat(),
    isNegated: false,
    encode: encodeCharacterClass,
  };
}

function escapeForCharacterClass(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getAllChars(characterClass: CharacterClass) {
  if (characterClass.escape === undefined) {
    return characterClass.chars;
  }

  return [characterClass.escape, ...characterClass.chars];
}
