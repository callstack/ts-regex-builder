import { encodeElement } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexComponent,
} from '../types';

export interface ChoiceOf extends RegexComponent {
  type: 'choiceOf';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export function choiceOf(
  ...children: Array<RegexComponent | string>
): ChoiceOf {
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
