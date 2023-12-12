import type { CharacterClass } from '../types';
import type { RegexNode } from '../types-internal';

export function compileCharacterClass({
  characters,
}: CharacterClass): RegexNode {
  if (characters.length === 0) {
    return {
      type: 'atom',
      pattern: '',
    };
  }

  if (characters.length === 1) {
    return {
      type: 'atom',
      pattern: characters[0]!,
    };
  }

  return {
    type: 'atom',
    pattern: `[${escapeHyphen(characters).join('')}]`,
  };
}

// If passed characters includes hyphen (`-`) it need to be moved to
// first (or last) place in order to treat it as hyphen character and not a range.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
function escapeHyphen(characters: string[]) {
  if (characters.includes('-')) {
    return ['-', ...characters.filter((c) => c !== '-')];
  }

  return characters;
}
