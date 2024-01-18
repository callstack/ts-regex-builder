import type { RegexElement, RegexSequence } from '../types';

export function wrapSequence(sequence: RegexSequence): RegexElement[] {
  return Array.isArray(sequence) ? sequence : [sequence];
}
