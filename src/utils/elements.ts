import type { RegexElement, RegexSequence } from '../types';

export function ensureArray(sequence: RegexSequence): RegexElement[] {
  return Array.isArray(sequence) ? sequence : [sequence];
}
