import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';
import { type QuantifierBehavior, validateBehavior } from './quantifiers';

export interface Repeat extends RegexConstruct {
  type: 'repeat';
  count: RepeatCount;
  behavior: QuantifierBehavior;
  children: RegexElement[];
}

export type RepeatCount = number | { min: number; max?: number };

export function repeat(
  sequence: RegexSequence,
  count: RepeatCount,
  behavior?: QuantifierBehavior,
): Repeat {
  const children = ensureArray(sequence);

  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  return {
    type: 'repeat',
    children,
    count: count,
    behavior: validateBehavior(behavior),
    encode: encodeRepeat,
  };
}

function encodeRepeat(this: Repeat): EncodeResult {
  const atomicNodes = encodeAtom(this.children);

  if (typeof this.count === 'number') {
    return {
      precedence: 'sequence',
      pattern: `${atomicNodes.pattern}{${this.count}}${this.behavior === 'lazy' ? '?' : ''}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicNodes.pattern}{${this.count.min},${this.count?.max ?? ''}}${
      this.behavior === 'lazy' ? '?' : ''
    }`,
  };
}
