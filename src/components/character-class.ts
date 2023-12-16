import { EncoderPrecedence, type EncoderNode } from '../encoder/types';
import { escapeText } from '../utils';
import type { CharacterClass } from './types';

export const any: CharacterClass = {
  type: 'characterClass',
  characters: ['.'],
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  characters: ['\\s'],
};

export const digit: CharacterClass = {
  type: 'characterClass',
  characters: ['\\d'],
};

export const word: CharacterClass = {
  type: 'characterClass',
  characters: ['\\w'],
};

export function anyOf(characters: string): CharacterClass {
  const charactersArray = characters.split('').map(escapeText);
  if (charactersArray.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    characters: charactersArray,
  };
}

export function encodeCharacterClass({
  characters,
}: CharacterClass): EncoderNode {
  if (characters.length === 0) {
    throw new Error('Character class should contain at least one character');
  }

  if (characters.length === 1) {
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: characters[0]!,
    };
  }

  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `[${reorderHyphen(characters).join('')}]`,
  };
}

// If passed characters includes hyphen (`-`) it need to be moved to
// first (or last) place in order to treat it as hyphen character and not a range.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
function reorderHyphen(characters: string[]) {
  if (characters.includes('-')) {
    return ['-', ...characters.filter((c) => c !== '-')];
  }

  return characters;
}
