import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Repeat extends RegexConstruct {
  type: 'repeat';
  children: RegexElement[];
  options: RepeatOptions;
}

export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

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

  if (typeof this.options === 'number') {
    return {
      precedence: 'sequence',
      pattern: `${atomicNodes.pattern}{${this.options}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicNodes.pattern}{${this.options.min},${this.options?.max ?? ''}}${
      this.options.greedy === false ? '?' : ''
    }`,
  };
}
