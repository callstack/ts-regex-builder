import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface Capture extends RegexElement {
  type: 'capture';
  children: RegexNode[];
}

export function capture(children: RegexNode | RegexNode[]): Capture {
  return {
    type: 'capture',
    children: asArray(children),
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeOutput {
  const encodedChildren = encodeSequence(this.children);

  return {
    precedence: 'atom',
    pattern: `(${encodedChildren.pattern})`,
  };
}
