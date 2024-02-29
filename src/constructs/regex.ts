import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexFlags, RegexSequence } from '../types';
import { encodeFlags } from '../builders';

export interface Regex extends RegexConstruct {
  type: 'regex';
  children: RegexElement[];
  build: (flags?: RegexFlags) => RegExp;
}

export function regex(sequence: RegexSequence): Regex {
  return {
    type: 'regex',
    children: ensureArray(sequence),
    build: buildRegex,
    encode: encodeRegex,
  };
}

function buildRegex(this: Regex, flags?: RegexFlags): RegExp {
  const pattern = this.encode().pattern;
  const flagsString = encodeFlags(flags ?? {});
  return new RegExp(pattern, flagsString);
}

function encodeRegex(this: Regex): EncodeResult {
  return encodeSequence(this.children);
}
