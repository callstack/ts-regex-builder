import type { EncodeOutput } from '../encoder/types';
import { escapeText } from '../utils/text';

export interface CharacterClass {
  type: 'characterClass';
  characters: string[];
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
  characters: ['.'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  characters: ['\\d'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const word: CharacterClass = {
  type: 'characterClass',
  characters: ['\\w'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  characters: ['\\s'],
  ranges: [],
  isInverted: false,
  encode: encodeCharacterClass,
};

export function characterClass(...elements: CharacterClass[]): CharacterClass {
  elements.forEach((element) => {
    if (element.isInverted) {
      throw new Error(
        '`characterClass` should receive only non-inverted character classes'
      );
    }
  });

  return {
    type: 'characterClass',
    characters: elements.map((c) => c.characters).flat(),
    ranges: elements.map((c) => c.ranges).flat(),
    isInverted: false,
    encode: encodeCharacterClass,
  };
}

export function characterRange(start: string, end: string): CharacterClass {
  if (start.length !== 1) {
    throw new Error(
      '`characterRange` should receive only single character `start` string'
    );
  }

  if (end.length !== 1) {
    throw new Error(
      '`characterRange` should receive only single character `end` string'
    );
  }

  if (start > end) {
    throw new Error('`start` should be before or equal to `end`');
  }

  const range = {
    start: escapeText(start),
    end: escapeText(end),
  };

  return {
    type: 'characterClass',
    characters: [],
    ranges: [range],
    isInverted: false,
    encode: encodeCharacterClass,
  };
}

export function anyOf(characters: string): CharacterClass {
  const charactersArray = characters.split('').map(escapeText);
  if (charactersArray.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    characters: charactersArray,
    ranges: [],
    isInverted: false,
    encode: encodeCharacterClass,
  };
}

export function inverted(element: CharacterClass): CharacterClass {
  return {
    type: 'characterClass',
    characters: element.characters,
    ranges: element.ranges,
    isInverted: !element.isInverted,
    encode: encodeCharacterClass,
  };
}

function encodeCharacterClass(this: CharacterClass): EncodeOutput {
  if (this.characters.length === 0 && this.ranges.length === 0) {
    throw new Error(
      'Character class should contain at least one character or character range'
    );
  }

  // Direct rendering for single-character class
  if (
    this.characters.length === 1 &&
    this.ranges?.length === 0 &&
    !this.isInverted
  ) {
    return {
      precedence: 'atom',
      pattern: this.characters[0]!,
    };
  }

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphen = this.characters.includes('-') ? '-' : '';
  const otherCharacters = this.characters.filter((c) => c !== '-').join('');
  const ranges = this.ranges
    .map(({ start, end }) => `${start}-${end}`)
    .join('');
  const isInverted = this.isInverted ? '^' : '';

  return {
    precedence: 'atom',
    pattern: `[${isInverted}${hyphen}${ranges}${otherCharacters}]`,
  };
}
