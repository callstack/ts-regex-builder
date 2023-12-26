import { encodeAtom } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface Repeat extends RegexElement {
  type: 'repeat';
  children: RegexNode[];
  config: RepeatConfig;
}

export type RepeatConfig = { count: number } | { min: number; max?: number };

export function repeat(
  config: RepeatConfig,
  children: RegexNode | RegexNode[]
): Repeat {
  children = asArray(children);

  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  return {
    type: 'repeat',
    children,
    config,
    encode: encodeRepeat,
  };
}

function encodeRepeat(this: Repeat): EncodeOutput {
  const atomicChildren = encodeAtom(this.children);

  if ('count' in this.config) {
    return {
      precedence: 'sequence',
      pattern: `${atomicChildren.pattern}{${this.config.count}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicChildren.pattern}{${this.config.min},${
      this.config?.max ?? ''
    }}`,
  };
}
