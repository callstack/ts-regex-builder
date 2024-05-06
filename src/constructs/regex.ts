import { encodeSequence } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import type { RegexSequence } from '../types';

export function regex(sequence: RegexSequence): EncodedRegex {
  return encodeSequence(sequence);
}
