import { encodeSequence } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export interface Capture extends RegexElement {
  type: 'capture';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

export function capture(...children: Array<RegexElement | string>): Capture {
  return {
    type: 'capture',
    children,
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncoderResult {
  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
