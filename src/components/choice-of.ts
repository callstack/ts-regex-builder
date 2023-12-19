import { encodeElement } from '../encoder/encoder';
import { EncoderPrecedence, type EncoderResult } from '../encoder/types';
import type { ChoiceOf, RegexElement } from './types';

export function choiceOf(...children: Array<RegexElement | string>): ChoiceOf {
  if (children.length === 0) {
    throw new Error('`choiceOf` should receive at least one option');
  }

  return {
    type: 'choiceOf',
    children,
    encode: encodeChoiceOf,
  };
}

function encodeChoiceOf(this: ChoiceOf): EncoderResult {
  const encodedNodes = this.children.map(encodeElement);
  if (encodedNodes.length === 1) {
    return encodedNodes[0]!;
  }

  return {
    precedence: EncoderPrecedence.Alternation,
    pattern: encodedNodes.map((n) => n.pattern).join('|'),
  };
}
