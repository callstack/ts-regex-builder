import type { EncodeResult } from '../encoder/types';
import type { GroupNumber, RegexConstruct } from '../types';

export interface Backrefence extends RegexConstruct {
  type: 'backreference';
  group: GroupNumber;
}

export function backreference(groupNumber: GroupNumber): Backrefence {
  return {
    type: 'backreference',
    group: groupNumber,
    encode: encodeCapture,
  };
}

function encodeCapture(this: Backrefence): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `\\${this.group}`,
  };
}
