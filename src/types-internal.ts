import type { RegexElement } from './types';

/**
 * Compiled regex pattern with information about its type (atom, sequence)
 */
export interface RegexNode {
  pattern: string;
  type: RegexNodeType;
}

export type RegexNodeType =
  /** Atom */
  | 'atom'
  /** Sequence of atoms */
  | 'sequence'
  /** Alternation */
  | 'alternation';

export type CompileSingle = (element: RegexElement) => RegexNode;
