import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { asElementArray } from '../utils/elements';
import type { Capture, RegexElement } from './types';

export function capture(children: RegexElement | RegexElement[]): Capture {
  return {
    type: 'capture',
    children: asElementArray(children),
  };
}

export function encodeCapture(node: EncoderNode): EncoderNode {
  return {
    precedence: EncoderPrecedence.Atom,
    pattern: `(${node.pattern})`,
  };
}
