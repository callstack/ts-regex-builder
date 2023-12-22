import type { RegexElement } from '../components/types';

/**
 * Encoded regex pattern with information about its type (atom, sequence)
 */
export interface EncoderNode {
  precedence: EncoderPrecedence;
  pattern: string;
}

/**
 * Order of precedence for regex operators.
 */
export const EncoderPrecedence = {
  // Atoms: single characters, character classes (`\d`, `[a-z]`),
  // capturing and non-capturing groups (`()`)
  Atom: 1,

  // Sequence of atoms, e.g., `abc`
  Sequence: 2,

  // Alteration (OR, `|`) expression, e.g., `a|b`
  Alternation: 3,
} as const;

type ValueOf<T> = T[keyof T];
type EncoderPrecedence = ValueOf<typeof EncoderPrecedence>;

export type EncodeSequence = (elements: RegexElement[]) => EncoderNode;
export type EncodeElement = (element: RegexElement) => EncoderNode;
