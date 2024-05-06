import { encodeSequence } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Regex extends RegexConstruct {
  type: 'sequence';
  children: RegexElement[];
}

export function regex(sequence: RegexSequence): Regex {
  return {
    type: 'sequence',
    children: ensureArray(sequence),
    encode: encodeRegex,
  };
}

function encodeRegex(this: Regex): EncodedRegex {
  return encodeSequence(this.children);
}
