import type { Capture, RegexElement } from './types';
import { EncoderPriority, type EncoderNode } from './types-internal';

export function capture(...children: RegexElement[]): Capture {
  return {
    type: 'capture',
    children,
  };
}

export function encodeCapture(node: EncoderNode): EncoderNode {
  return {
    pattern: `(${node.pattern})`,
    priority: EncoderPriority.Atom,
  };
}
