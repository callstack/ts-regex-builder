import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexComponentResult, RegexElement, RegexSequence } from '../types';

export interface Capture extends RegexComponentResult {
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

function encodeCapture(this: Capture): EncodeOutput {
  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
