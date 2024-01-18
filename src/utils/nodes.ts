import type { RegexElement, RegexSequence } from '../types';

export function asNodeArray(sequence: RegexSequence): RegexElement[] {
  return Array.isArray(sequence) ? sequence : [sequence];
}
