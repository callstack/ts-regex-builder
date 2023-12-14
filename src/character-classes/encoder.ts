import type { CharacterClass } from '../types';
import { EncoderPriority, type EncoderNode } from '../types-internal';

export function encodeCharacterClass({
  characters,
}: CharacterClass): EncoderNode {
  if (characters.length === 0) {
    throw new Error('Character class should contain at least one character');
  }

  if (characters.length === 1) {
    return {
      priority: EncoderPriority.Atom,
      pattern: characters[0]!,
    };
  }

  return {
    priority: EncoderPriority.Atom,
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
