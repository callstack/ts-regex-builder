import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { wrapSequence } from '../utils/elements';
import type { RegexElement, RegexOperator, RegexSequence } from '../types';

export interface Capture extends RegexOperator {
  type: 'capture';
  children: RegexElement[];
}

export function capture(sequence: RegexSequence): Capture {
  return {
    type: 'capture',
    children: wrapSequence(sequence),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
