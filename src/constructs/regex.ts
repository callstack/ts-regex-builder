import { encodeSequence } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export function regex(sequence: RegexSequence): EncodedRegex {
  return encodeSequence(sequence);
}
