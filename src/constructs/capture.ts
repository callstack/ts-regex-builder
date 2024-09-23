import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

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
export function capture(sequence: RegexSequence, options?: CaptureOptions): EncodedRegex | null {
  const elements = ensureElements(sequence);
  if (elements.length === 0) {
    return null;
  }

  const name = options?.name;
  if (name) {
    return {
      precedence: 'atom',
      pattern: `(?<${name}>${encode(elements).pattern})`,
    };
  }

  return {
    precedence: 'atom',
    pattern: `(${encode(elements).pattern})`,
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
    precedence: 'atom',
    pattern: `\\k<${name}>`,
    name,
  };
}
