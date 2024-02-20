import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Capture extends RegexConstruct {
  type: 'capture';
  children: RegexElement[];
  options?: CaptureOptions;
}

export interface CaptureOptions {
  name?: string;
}

export function capture(sequence: RegexSequence, options?: CaptureOptions): Capture {
  return {
    type: 'capture',
    children: ensureArray(sequence),
    options,
    encode: encodeCapture,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  const name = this.options?.name;
  if (name) {
    return {
      precedence: 'atom',
      pattern: `(?<${name}>${encodeSequence(this.children).pattern})`,
    };
  }

  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}
