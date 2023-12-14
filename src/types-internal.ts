import type { RegexElement } from './types';

/**
 * Compiled regex pattern with information about its type (atom, sequence)
 */
export interface EncoderNode {
  pattern: string;
  priority: EncoderPriority;
}

/**
 * Higher is more important.
 */
export const EncoderPriority = {
  // Atoms: single characters, character classes (`\d`, `[a-z]`),
  // capturing and non-capturing groups (`()`)
  Atom: 3,

  // Sequence of atoms, e.g., `abc`
  Sequence: 2,

  // Alteration (OR, `|`) expression, e.g., `a|b`
  Alternation: 1,
} as const;

type ValueOf<T> = T[keyof T];
type EncoderPriority = ValueOf<typeof EncoderPriority>;

export type EncodeElement = (element: RegexElement) => EncoderNode;
