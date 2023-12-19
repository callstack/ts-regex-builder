import { encodeSequence } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export class Capture implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    this.children = children;
  }

  encode(): EncoderResult {
    const children = encodeSequence(this.children);
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: `(${children.pattern})`,
    };
  }
}

export function capture(...children: Array<RegexElement | string>): Capture {
  return new Capture(children);
}
