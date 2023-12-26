import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface Capture extends RegexElement {
  type: 'capture';
  children: RegexNode[];
}

export function capture(nodes: RegexNode | RegexNode[]): Capture {
  return {
    type: 'capture',
    children: asNodeArray(nodes),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeOutput {
  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
