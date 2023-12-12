import type { CharacterClass } from '../types';
import { escapeText } from '../utils';

export function anyOf(characters: string): CharacterClass {
  return {
    type: 'characterClass',
    characters: characters.split('').map(escapeText),
  };
}
