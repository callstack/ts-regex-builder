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
  compileSingle: EncodeElement
): EncoderNode {
  const compileNodes = element.children.map(compileSingle);
  if (compileNodes.length === 1) {
    return compileNodes[0]!;
  }

  return {
    priority: EncoderPriority.Alternation,
    pattern: compileNodes.map((n) => n.pattern).join('|'),
  };
}
