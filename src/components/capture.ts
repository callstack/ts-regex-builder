import { encodeSequence } from '../encoder/encoder';
import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from './types';

export interface Capture extends RegexElement {
  type: 'capture';
  children: RegexNode[];
}

export function capture(children: RegexNode | RegexNode[]): Capture {
  return {
    type: 'capture',
    children: asNodeArray(children),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncoderNode {
  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
