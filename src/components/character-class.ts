import type { EncodeOutput } from '../encoder/types';

export interface CharacterClass {
  type: 'characterClass';
  chars: string[];
  ranges: CharacterRange[];
  isInverted: boolean;
  encode: () => EncodeOutput;
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
  chars: ['.'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  chars: ['\\d'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const word: CharacterClass = {
  type: 'characterClass',
  chars: ['\\w'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  chars: ['\\s'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export function charClass(...elements: CharacterClass[]): CharacterClass {
  elements.forEach((element) => {
    if (element.isInverted) {
      throw new Error('`charClass` should receive only non-inverted character classes');
    }
  });

  return {
    type: 'characterClass',
    chars: elements.map((c) => c.chars).flat(),
    ranges: elements.map((c) => c.ranges).flat(),
    isInverted: false,
    encode: encodeCharacterClass,
  };
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
    isInverted: false,
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
    isInverted: false,
    encode: encodeCharacterClass,
  };
}

export function inverted(element: CharacterClass): CharacterClass {
  return {
    type: 'characterClass',
    chars: element.chars,
    ranges: element.ranges,
    isInverted: !element.isInverted,
    encode: encodeCharacterClass,
  };
}

function encodeCharacterClass(this: CharacterClass): EncodeOutput {
  if (this.chars.length === 0 && this.ranges.length === 0) {
    throw new Error('Character class should contain at least one character or character range');
  }

  // Direct rendering for single-character class
  if (this.chars.length === 1 && this.ranges?.length === 0 && !this.isInverted) {
    return {
      precedence: 'atom',
      pattern: this.chars[0]!,
    };
  }

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphen = this.chars.includes('-') ? '-' : '';
  const caret = this.chars.includes('^') ? '^' : '';
  const otherChars = this.chars.filter((c) => c !== '-' && c !== '^').join('');
  const ranges = this.ranges.map(({ start, end }) => `${start}-${end}`).join('');
  const isInverted = this.isInverted ? '^' : '';

  let pattern = `[${isInverted}${ranges}${otherChars}${caret}${hyphen}]`;
  if (pattern === '[^-]') pattern = '[\\^-]';

  return {
    precedence: 'atom',
    pattern,
  };
}

function escapeForCharacterClass(text: string): string {
  return text.replace(/[\]\\]/g, '\\$&'); // $& means the whole matched string
}
