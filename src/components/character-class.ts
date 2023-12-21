import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { escapeText } from '../utils';
import type { CharacterClass } from './types';

export const any: CharacterClass = {
  type: 'characterClass',
  characters: ['.'],
  inverted: false,
};

export const digit: CharacterClass = {
  type: 'characterClass',
  characters: ['\\d'],
  inverted: false,
};

export const word: CharacterClass = {
  type: 'characterClass',
  characters: ['\\w'],
  inverted: false,
};

export const whitespace: CharacterClass = {
  type: 'characterClass',
  characters: ['\\s'],
  inverted: false,
};

export function anyOf(characters: string): CharacterClass {
  const charactersArray = characters.split('').map(escapeText);
  if (charactersArray.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return {
    type: 'characterClass',
    characters: charactersArray,
    inverted: false,
  };
}

export function inverted(characterClass: CharacterClass): CharacterClass {
  return {
    type: 'characterClass',
    characters: characterClass.characters,
    inverted: !characterClass.inverted,
  };
}

export function encodeCharacterClass(
  characterClass: CharacterClass
): EncoderNode {
  if (characterClass.characters.length === 0) {
    throw new Error('Character class should contain at least one character');
  }

  if (characterClass.characters.length === 1 && !characterClass.inverted) {
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: characterClass.characters[0]!,
    };
  }

  const characterString = reorderHyphen(characterClass.characters).join('');
  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `[${characterClass.inverted ? '^' : ''}${characterString}]`,
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
