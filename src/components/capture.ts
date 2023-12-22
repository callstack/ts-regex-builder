import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { toArray } from '../utils';
import type { Capture, RegexElement } from './types';

export function capture(children: RegexElement | RegexElement[]): Capture {
  return {
    type: 'capture',
    children: toArray(children),
  };
}

export function encodeCapture(node: EncoderNode): EncoderNode {
  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `(${node.pattern})`,
  };
}
