import type { RegexElement, RegexSequence } from './types';

export function ensureElements(sequence: RegexSequence): RegexElement[] {
  return Array.isArray(sequence) ? sequence : [sequence];
}
