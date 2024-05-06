import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export function choiceOf(...alternatives: RegexSequence[]): EncodedRegex {
  if (alternatives.length === 0) {
    throw new Error('`choiceOf` should receive at least one alternative');
  }

  const encodedAlternatives = alternatives.map((c) => encode(c));
  if (encodedAlternatives.length === 1) {
    return encodedAlternatives[0]!;
  }

  return {
    precedence: 'disjunction',
    pattern: encodedAlternatives.map((n) => n.pattern).join('|'),
  };
}
