import { encodeAtom } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface Repeat extends RegexElement {
  type: 'repeat';
  options: RepeatOptions;
  children: RegexNode[];
}

export type RepeatOptions = { count: number } | { min: number; max?: number };

export function repeat(
  options: RepeatOptions,
  nodes: RegexNode | RegexNode[]
): Repeat {
  const children = asNodeArray(nodes);

  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  return {
    type: 'repeat',
    children,
    options,
    encode: encodeRepeat,
  };
}

function encodeRepeat(this: Repeat): EncodeOutput {
  const atomicNodes = encodeAtom(this.children);

  if ('count' in this.options) {
    return {
      precedence: 'sequence',
      pattern: `${atomicNodes.pattern}{${this.options.count}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicNodes.pattern}{${this.options.min},${
      this.options?.max ?? ''
    }}`,
  };
}
