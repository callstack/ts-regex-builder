import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Sequence extends RegexConstruct {
  type: 'sequence';
  children: RegexElement[];
}

export function sequence(sequence: RegexSequence): Sequence {
  return {
    type: 'sequence',
    children: ensureArray(sequence),
    encode: encodeSequenceImpl,
  };
}

function encodeSequenceImpl(this: Sequence): EncodeResult {
  return encodeSequence(this.children);
}
