import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexOperator, RegexSequence } from '../types';

export interface Capture extends RegexOperator {
  type: 'capture';
  children: RegexElement[];
}

export function capture(sequence: RegexSequence): Capture {
  return {
    type: 'capture',
    children: asNodeArray(sequence),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
