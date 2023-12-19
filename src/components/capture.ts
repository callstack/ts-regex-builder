import { encodeSequence } from '../encoder';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexComponent,
} from '../types';

export interface Capture extends RegexComponent {
  type: 'capture';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export function capture(...children: Array<RegexComponent | string>): Capture {
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
