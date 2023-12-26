import { encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { toAtom } from '../encoder/utils';
import { asNodeArray } from '../utils/nodes';
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
  children = asNodeArray(children);

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
  const atomicChildren = toAtom(encodeSequence(this.children));

  if ('count' in this.config) {
    return {
      precedence: 'sequence',
      pattern: `${atomicChildren}{${this.config.count}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicChildren}{${this.config.min},${this.config?.max ?? ''}}`,
  };
}
