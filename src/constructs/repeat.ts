import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Repeat extends RegexConstruct {
  type: 'repeat';
  options: RepeatOptions;
  children: RegexElement[];
}

export type RepeatOptions = { count: number } | { min: number; max?: number };

export function repeat(sequence: RegexSequence, options: RepeatOptions): Repeat {
  const children = ensureArray(sequence);

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

function encodeRepeat(this: Repeat): EncodeResult {
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
