import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Regex extends RegexConstruct {
  type: 'sequence';
  children: RegexElement[];
}

export function regex(sequence: RegexSequence): Regex {
  const children = ensureArray(sequence);
  if (children.length === 0) {
    throw new Error('`regex` should receive at least one element');
  }

  return {
    type: 'sequence',
    children,
    encode: encodeRegex,
  };
}

function encodeRegex(this: Regex): EncodeResult {
  return encodeSequence(this.children);
}
