import type { RegexElement, RegexSequence } from './types';

export function ensureElements(sequence: RegexSequence): RegexElement[] {
  const elements = Array.isArray(sequence) ? sequence : [sequence];
  if (elements.length === 0) {
    throw new Error('Expected at least one element');
  }

  return elements;
}
