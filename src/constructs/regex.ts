import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

/**
 * Groups the given sequence into a single element.
 *
 * @param sequence - Sequence to group.
 */
export function regex(sequence: RegexSequence): EncodedRegex {
  return encode(sequence);
}
