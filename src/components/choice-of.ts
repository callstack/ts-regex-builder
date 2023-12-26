import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface ChoiceOf extends RegexElement {
  type: 'choiceOf';
  children: RegexNode[][];
}

export function choiceOf(
  ...children: Array<RegexNode | RegexNode[]>
): ChoiceOf {
  if (children.length === 0) {
    throw new Error('`choiceOf` should receive at least one option');
  }

  return {
    type: 'choiceOf',
    children: children.map((c) => asNodeArray(c)),
    encode: encodeChoiceOf,
  };
}

function encodeChoiceOf(this: ChoiceOf): EncodeOutput {
  const encodedNodes = this.children.map((c) => encodeSequence(c));
  if (encodedNodes.length === 1) {
    return encodedNodes[0]!;
  }

  return {
    precedence: 'alternation',
    pattern: encodedNodes.map((n) => n.pattern).join('|'),
  };
}
