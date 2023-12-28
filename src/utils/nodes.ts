import type { RegexNode, RegexSequence } from '../types';

export function asNodeArray(sequence: RegexSequence): RegexNode[] {
  return Array.isArray(sequence) ? sequence : [sequence];
}
