import { encodeSequence } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import type { RegexSequence } from '../types';

export function choiceOf(...alternatives: RegexSequence[]): EncodedRegex {
  if (alternatives.length === 0) {
    throw new Error('`choiceOf` should receive at least one alternative');
  }

  const encodedAlternatives = alternatives.map((c) => encodeSequence(c));
  if (encodedAlternatives.length === 1) {
    return encodedAlternatives[0]!;
  }

  return {
    precedence: 'disjunction',
    pattern: encodedAlternatives.map((n) => n.pattern).join('|'),
  };
}
