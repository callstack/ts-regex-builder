/**
 * Encoded regex pattern with information about its type (atom, sequence)
 */
export interface EncodeOutput {
  precedence: EncodePrecedence;
  pattern: string;
}

export type EncodePrecedence = 'atom' | 'sequence' | 'alternation';
