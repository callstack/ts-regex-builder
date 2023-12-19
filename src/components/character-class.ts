import { EncoderPrecedence, type EncoderResult } from '../encoder/types';
import { escapeText } from '../utils';
import type { CharacterClass } from './types';

export const any: CharacterClass = {
  type: 'characterClass',
  characters: ['.'],
  encode: encodeCharacterClass,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  characters: ['\\s'],
  encode: encodeCharacterClass,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  characters: ['\\d'],
  encode: encodeCharacterClass,
};

export const word: CharacterClass = {
  type: 'characterClass',
  characters: ['\\w'],
  encode: encodeCharacterClass,
};

export function anyOf(characters: string): CharacterClass {
  const charactersArray = characters.split('').map(escapeText);
  if (charactersArray.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    characters: charactersArray,
    encode: encodeCharacterClass,
  };
}

function encodeCharacterClass(this: CharacterClass): EncoderResult {
  if (this.characters.length === 0) {
    throw new Error('Character class should contain at least one character');
  }

  if (this.characters.length === 1) {
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: this.characters[0]!,
    };
  }

  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `[${reorderHyphen(this.characters).join('')}]`,
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
