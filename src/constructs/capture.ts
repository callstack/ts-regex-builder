import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export type CaptureOptions = {
  /**
   * Name to be given to the capturing group.
   */
  name?: string;
};

export interface Reference extends EncodedRegex {
  name: string;
}

/**
 * Creates a capturing group which allows the matched pattern to be available:
 * - in the match results (`String.match`, `String.matchAll`, or `RegExp.exec`)
 * - in the regex itself, through {@link ref}
 */
export function capture(sequence: RegexSequence, options?: CaptureOptions): EncodedRegex {
  const name = options?.name;
  if (name) {
    return {
      precedence: 0,
      pattern: `(?<${name}>${encode(sequence).pattern})`,
    };
  }

  return {
    precedence: 0,
    pattern: `(${encode(sequence).pattern})`,
  };
}

/**
 * Creates a reference, also known as backreference, which allows matching
 * again the exact text that a capturing group previously matched.
 *
 * In order to form a valid regex, the reference must use the same name as
 * a capturing group earlier in the expression.
 *
 * @param name - Name of the capturing group to reference.
 */
export function ref(name: string): Reference {
  return {
    precedence: 0,
    pattern: `\\k<${name}>`,
    name,
  };
}
