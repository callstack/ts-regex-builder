import type { ChoiceOf, RegexElement } from '../types';
import {
  EncoderPriority,
  type EncodeElement,
  type EncoderNode,
} from '../types-internal';

export function choiceOf(...children: RegexElement[]): ChoiceOf {
  if (children.length === 0) {
    throw new Error('`choiceOf` should receive at least one option');
  }

  return {
    type: 'choiceOf',
    children,
  };
}

export function encodeChoiceOf(
  element: ChoiceOf,
  encodeElement: EncodeElement
): EncoderNode {
  const encodedNodes = element.children.map(encodeElement);
  if (encodedNodes.length === 1) {
    return encodedNodes[0]!;
  }

  return {
    priority: EncoderPriority.Alternation,
    pattern: encodedNodes.map((n) => n.pattern).join('|'),
  };
}
