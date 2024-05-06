import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export function regex(sequence: RegexSequence): EncodedRegex {
  return encode(sequence);
}
