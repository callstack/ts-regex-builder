//import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
//import { ensureArray } from '../utils/elements';
import type { RegexConstruct } from '../types';

export interface NamedBackreference extends RegexConstruct {
  type: 'named-backreference';
  name: string;
}

export function namedBackreference(groupName: string): NamedBackreference {
  return {
    type: 'named-backreference',
    name: groupName,
    encode: encodeCapture,
  };
}

function encodeCapture(this: NamedBackreference): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `\\k<${this.name}>`,
  };
}
