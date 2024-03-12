import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface NamedCapture extends RegexConstruct {
  type: 'named-capture';
  name: string;
  children: RegexElement[];
}

export function namedCapture(sequence: RegexSequence, name: string): NamedCapture {
  return {
    type: 'named-capture',
    name: name,
    children: ensureArray(sequence),
    encode: encodeCapture,
  };
}

function encodeCapture(this: NamedCapture): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(?<${this.name}>${encodeSequence(this.children).pattern})`,
  };
}
