import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

/**
 * Creates a disjunction (choice of) which matches any of the alternatives.
 *
 * @param alternatives - Alternatives to choose from.
 * @returns Choice of alternatives.
 */
export function choiceOf(...alternatives: RegexSequence[]): EncodedRegex {
  if (alternatives.length === 0) {
    throw new Error('Expected at least one alternative');
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
