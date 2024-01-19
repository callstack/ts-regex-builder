import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Capture extends RegexConstruct {
  type: 'capture';
  children: RegexElement[];
}

export function capture(sequence: RegexSequence): Capture {
  return {
    type: 'capture',
    children: ensureArray(sequence),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
