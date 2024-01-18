/**
 * Encoded regex pattern with information about its type (atom, sequence)
 */
export interface EncodeResult {
  precedence: EncodePrecedence;
  pattern: string;
}

export type EncodePrecedence = 'atom' | 'sequence' | 'disjunction';
