import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Capture extends RegexConstruct {
  type: 'capture';
  children: RegexElement[];
  options?: CaptureOptions;

  /** Creates a backreference to a capturing group.
   * It allows to match the same text that was previously captured by the capturing group.
   *
   * Note: requires `name` option to be passed.
   */
  ref: () => Backreference;
}

export type CaptureOptions = {
  /**
   * Name to be given to the capturing group can either by a string or {@link ref} instance.
   */
  name: string;
};

export interface Backreference extends RegexConstruct {
  type: 'backreference';
  name: string;
}

/**
 * Creates a capturing group which allows the matched pattern to be available:
 * - in the match results (`String.match`, `String.matchAll`, or `RegExp.exec`)
 * - in the regex itself, through {@link ref}
 */
export function capture(sequence: RegexSequence, options?: CaptureOptions): Capture {
  return {
    type: 'capture',
    children: ensureArray(sequence),
    options,
    ref: generateRef,
    encode: encodeCapture,
  };
}

function generateRef(this: Capture): Backreference {
  const name = this.options?.name;
  if (!name) {
    throw new Error('Capture group "name" is required when calling "ref()".');
  }

  return {
    type: 'backreference',
    name,
    encode: encodeBackreference,
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

function encodeBackreference(this: Backreference): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `\\k<${this.name}>`,
  };
}
