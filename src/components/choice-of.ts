import { encodeElement } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export interface ChoiceOf extends RegexElement {
  type: 'choiceOf';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

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
