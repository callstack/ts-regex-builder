import type { CharacterClass } from '../types';
import { RegexNodePriority, type RegexNode } from '../types-internal';

export function compileCharacterClass({
  characters,
}: CharacterClass): RegexNode {
  if (characters.length === 0) {
    throw new Error('Character class should contain at least one character');
  }

  if (characters.length === 1) {
    return {
      priority: RegexNodePriority.Atom,
      pattern: characters[0]!,
    };
  }

  return {
    priority: RegexNodePriority.Atom,
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
