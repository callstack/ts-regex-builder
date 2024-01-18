import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { wrapSequence } from '../utils/elements';
import type { RegexElement, RegexOperator, RegexSequence } from '../types';

export interface ChoiceOf extends RegexOperator {
  type: 'choiceOf';
  alternatives: RegexElement[][];
}

export function choiceOf(...alternatives: RegexSequence[]): ChoiceOf {
  if (alternatives.length === 0) {
    throw new Error('`choiceOf` should receive at least one alternative');
  }

  return {
    type: 'choiceOf',
    alternatives: alternatives.map((c) => wrapSequence(c)),
    encode: encodeChoiceOf,
  };
}

function encodeChoiceOf(this: ChoiceOf): EncodeResult {
  const encodedAlternatives = this.alternatives.map((c) => encodeSequence(c));
  if (encodedAlternatives.length === 1) {
    return encodedAlternatives[0]!;
  }

  return {
    precedence: 'alternation',
    pattern: encodedAlternatives.map((n) => n.pattern).join('|'),
  };
}
