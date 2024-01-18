import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexComponent, RegexElement, RegexSequence } from '../types';

export interface ChoiceOf extends RegexComponent {
  type: 'choiceOf';
  alternatives: RegexElement[][];
}

export function choiceOf(...alternatives: RegexSequence[]): ChoiceOf {
  if (alternatives.length === 0) {
    throw new Error('`choiceOf` should receive at least one alternative');
  }

  return {
    type: 'choiceOf',
    alternatives: alternatives.map((c) => asNodeArray(c)),
    encode: encodeChoiceOf,
  };
}

function encodeChoiceOf(this: ChoiceOf): EncodeOutput {
  const encodedAlternatives = this.alternatives.map((c) => encodeSequence(c));
  if (encodedAlternatives.length === 1) {
    return encodedAlternatives[0]!;
  }

  return {
    precedence: 'alternation',
    pattern: encodedAlternatives.map((n) => n.pattern).join('|'),
  };
}
