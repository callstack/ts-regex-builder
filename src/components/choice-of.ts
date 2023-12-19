import { encodeElement } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export class ChoiceOf implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    if (children.length === 0) {
      throw new Error('"choiceOf" should receive at least one option');
    }

    this.children = children;
  }

  encode(): EncoderResult {
    const children = this.children.map(encodeElement);
    if (children.length === 1) {
      return children[0]!;
    }

    return {
      precedence: EncoderPrecedence.Alternation,
      pattern: children.map((n) => n.pattern).join('|'),
    };
  }
}

export function choiceOf(...children: Array<RegexElement | string>): ChoiceOf {
  return new ChoiceOf(children);
}
