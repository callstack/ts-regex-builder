import { encodeAtom } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexComponentResult, RegexElement, RegexSequence } from '../types';

export interface Repeat extends RegexComponentResult {
  type: 'repeat';
  options: RepeatOptions;
  children: RegexElement[];
}

export type RepeatOptions = { count: number } | { min: number; max?: number };

export function repeat(sequence: RegexSequence, options: RepeatOptions): Repeat {
  const children = asNodeArray(sequence);

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
    pattern: `${atomicNodes.pattern}{${this.options.min},${this.options?.max ?? ''}}`,
  };
}
