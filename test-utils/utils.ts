import type { RegexElement, RegexNode } from '../src/types';

export function isRegexNode(node: unknown): node is RegexNode {
  return typeof node === 'string' || isRegexElement(node);
}

export function isRegexElement(element: unknown): element is RegexElement {
  return (
    typeof element === 'object' &&
    element !== null &&
    'encode' in element &&
    typeof element.encode === 'function'
  );
}
