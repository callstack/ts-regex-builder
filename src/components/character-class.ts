import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { escapeText } from '../utils';
import type { CharacterClass } from './types';

export const any: CharacterClass = {
  type: 'characterClass',
  characters: ['.'],
  ranges: [],
  isInverted: false,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  characters: ['\\d'],
  ranges: [],
  isInverted: false,
};

export const word: CharacterClass = {
  type: 'characterClass',
  characters: ['\\w'],
  ranges: [],
  isInverted: false,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  characters: ['\\s'],
  ranges: [],
  isInverted: false,
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
    throw new Error('`start` should be less or equal to `end`');
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
  };
}

export function inverted({
  characters,
  ranges,
  isInverted,
}: CharacterClass): CharacterClass {
  return {
    type: 'characterClass',
    characters: characters,
    ranges: ranges,
    isInverted: !isInverted,
  };
}

export function encodeCharacterClass({
  characters,
  ranges,
  isInverted,
}: CharacterClass): EncoderNode {
  if (characters.length === 0 && ranges.length === 0) {
    throw new Error(
      'Character class should contain at least one character or character range'
    );
  }

  // Direct rendering for single-character class
  if (characters.length === 1 && ranges?.length === 0 && !isInverted) {
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: characters[0]!,
    };
  }

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphenString = characters.includes('-') ? '-' : '';
  const charactersString = characters.filter((c) => c !== '-').join('');
  const rangesString = ranges
    .map(({ start, end }) => `${start}-${end}`)
    .join('');
  const invertedString = isInverted ? '^' : '';

  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `[${invertedString}${hyphenString}${rangesString}${charactersString}]`,
  };
}
