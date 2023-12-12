import type { CharacterClass } from '../types';

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

export const any: CharacterClass = {
  type: 'characterClass',
  characters: ['.'],
};