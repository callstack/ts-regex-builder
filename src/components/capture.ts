import { encodeSequence } from '../encoder/encoder';
import { EncoderPrecedence, type EncoderResult } from '../encoder/types';
import type { Capture, RegexElement } from './types';

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
