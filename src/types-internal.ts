import type { RegexElement } from './types';

/**
 * Compiled regex pattern with information about its type (atom, sequence)
 */
export interface RegexNode {
  pattern: string;
  priority: RegexNodePriority;
}

/**
 * Higher is more important.
 */
export const RegexNodePriority = {
  // Atoms: single characters, character classes (`\d`, `[a-z]`),
  // capturing and non-capturing groups (`()`)
  Atom: 3,

  // Sequence of atoms, e.g., `abc`
  Sequence: 2,

  // Alteration (OR, `|`) expression, e.g., `a|b`
  Alternation: 1,
} as const;

type ValueOf<T> = T[keyof T];
type RegexNodePriority = ValueOf<typeof RegexNodePriority>;

export type CompileSingle = (element: RegexElement) => RegexNode;
