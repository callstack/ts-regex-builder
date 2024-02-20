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
  /**
   * Either a name to be given to the capturing group or a `Reference` object ({@link ref})
   * that will allow to match the captured text again later. */
  as?: Backreference | string;
}

export interface Backreference extends RegexConstruct {
  type: 'reference';
  name: string;
}

/**
 * Creates a capturing group which allows the matched pattern to be available:
 * - in the match results (`String.match`, `String.matchAll`, or `RegExp.exec`)
 * - in the regex itself, through backreferences (@see ref)
 */
export function capture(sequence: RegexSequence, options?: CaptureOptions): Capture {
  return {
    type: 'capture',
    children: ensureArray(sequence),
    options,
    encode: encodeCapture,
  };
}

let counter = 0;

/**
 * Creates a backreference to a capturing group.
 *
 * Backreferences allows to match the same text that was previously captured by a capturing group.
 *
 * @param name - Name to be given to the capturing group which receives this `Backreference`. If not provided, a unique name will be generated.
 */
export function ref(name?: string): Backreference {
  return {
    type: 'reference',
    name: name ?? `ref${counter++}`,
    encode: encodeReference,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  const ref = this.options?.as;
  if (ref) {
    const refName = typeof ref === 'string' ? ref : ref?.name;
    return {
      precedence: 'atom',
      pattern: `(?<${refName}>${encodeSequence(this.children).pattern})`,
    };
  }

  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}

function encodeReference(this: Backreference): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `\\k<${this.name}>`,
  };
}
