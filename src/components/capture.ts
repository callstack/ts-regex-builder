import { EncoderPrecedence, type EncoderNode } from '../encoder/types';
import type { Capture, RegexElement } from './types';

export function capture(...children: RegexElement[]): Capture {
  return {
    type: 'capture',
    children,
  };
}

export function encodeCapture(node: EncoderNode): EncoderNode {
  return {
    pattern: `(${node.pattern})`,
    precedence: EncoderPrecedence.Atom,
  };
}
