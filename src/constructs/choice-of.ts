import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

/**
 * Creates a disjunction (choice of) which matches any of the alternatives.
 *
 * @param alternatives - Alternatives to choose from.
 * @returns Choice of alternatives.
 */
export function choiceOf(...alternatives: RegexSequence[]): EncodedRegex | null {
  if (alternatives.length === 0) {
    return null;
  }

  const encodedAlternatives = alternatives.map((c) => encode(c)).filter((c) => c != null);
  if (encodedAlternatives.length === 1) {
    return encodedAlternatives[0]!;
  }

  return {
    precedence: 'disjunction',
    pattern: encodedAlternatives.map((n) => n.pattern).join('|'),
  };
}
