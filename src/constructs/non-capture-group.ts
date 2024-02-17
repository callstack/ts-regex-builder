import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

/**
 * Non-capture group.
 *
 * A non-capture group is a group that does not capture the matched characters, allowing for more efficient matching.
 *
 * @example
 * ```ts
 * nonCaptureGroup("a");
 * // /(?:a)/
 *
 * nonCaptureGroup(["a", "b", "c"]);
 * // /(?:abc)/
 * ```
 */
export interface NonCaptureGroup extends RegexConstruct {
  type: 'NonCaptureGroup';
  children: RegexElement[];
}

export function nonCaptureGroup(sequence: RegexSequence): NonCaptureGroup {
  return {
    type: 'NonCaptureGroup',
    children: ensureArray(sequence),
    encode: encodeNonCaptureGroup,
  };
}

function encodeNonCaptureGroup(this: NonCaptureGroup): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(:${encodeSequence(this.children).pattern})`,
  };
}
