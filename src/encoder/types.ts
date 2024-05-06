/**
 * Encoded regex pattern with information about its type (atom, sequence)
 */
export interface EncodedRegex {
  precedence: EncodePrecedence;
  pattern: string;
}

export type EncodePrecedence = 'atom' | 'sequence' | 'disjunction';
