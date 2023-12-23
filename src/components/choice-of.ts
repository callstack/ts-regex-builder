import {
  type EncoderNode,
  EncoderPrecedence,
  type EncodeSequence,
} from '../encoder/types';
import { asElementArray } from '../utils/elements';
import type { ChoiceOf, RegexElement } from './types';

export function choiceOf(
  ...children: Array<RegexElement | RegexElement[]>
): ChoiceOf {
  if (children.length === 0) {
    throw new Error('`choiceOf` should receive at least one option');
  }

  return {
    type: 'choiceOf',
    children: children.map((c) => asElementArray(c)),
  };
}

export function encodeChoiceOf(
  element: ChoiceOf,
  encodeSequence: EncodeSequence
): EncoderNode {
  const encodedNodes = element.children.map((c) => encodeSequence(c));
  if (encodedNodes.length === 1) {
    return encodedNodes[0]!;
  }

  return {
    precedence: EncoderPrecedence.Alternation,
    pattern: encodedNodes.map((n) => n.pattern).join('|'),
  };
}
