import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import type { Capture, RegexElement } from './types';

export function capture(...children: Array<RegexElement | string>): Capture {
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
