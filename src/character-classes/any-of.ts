import type { CharacterClass } from '../types';
import { escapeText } from '../utils';

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
