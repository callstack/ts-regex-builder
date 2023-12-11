import type { CharacterClass } from '../types';

export function compileCharacterClass({ characters }: CharacterClass): string {
  if (characters.length === 0) {
    return '';
  }

  if (characters.length === 1) {
    return characters[0] ?? '';
  }

  return `[${escapeHypen(characters).join('')}]`;
}

// If passed characters includes hypen (`-`) it need to be moved to
// first (or last) place in order to treat it as hypen character and not a range.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
function escapeHypen(characters: string[]) {
  if (characters.includes('-')) {
    return ['-', ...characters.filter((c) => c !== '-')];
  }

  return characters;
}
