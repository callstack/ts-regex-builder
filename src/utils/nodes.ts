import type { RegexElement, RegexNode } from '../types';

export function isRegexElement(element: unknown): element is RegexElement {
  return (
    typeof element === 'object' &&
    element !== null &&
    'encode' in element &&
    typeof element.encode === 'function'
  );
}

export function isRegexNode(element: unknown): element is RegexNode {
  return typeof element === 'string' || isRegexElement(element);
}

export function asNodeArray(nodeOrArray: RegexNode | RegexNode[]): RegexNode[] {
  return Array.isArray(nodeOrArray) ? nodeOrArray : [nodeOrArray];
}
