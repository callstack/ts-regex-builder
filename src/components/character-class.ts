import { escapeText } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export class CharacterClass implements RegexElement {
  public characters: string[];

  constructor(characters: string[]) {
    if (characters.length === 0) {
      throw new Error('Character class should contain at least one character');
    }

    this.characters = characters;
  }

  encode(): EncoderResult {
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
}

export const any = new CharacterClass(['.']);
export const whitespace = new CharacterClass(['\\s']);
export const digit = new CharacterClass(['\\d']);
export const word = new CharacterClass(['\\w']);

export function anyOf(characters: string): CharacterClass {
  const charactersArray = characters.split('').map(escapeText);
  if (charactersArray.length === 0) {
    throw new Error('`anyOf` should received at least one character');
  }

  return new CharacterClass(charactersArray);
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
