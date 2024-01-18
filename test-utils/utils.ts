import { buildRegExp } from '../src/builders';
import type { RegexElement, RegexOperator } from '../src/types';

export function isRegexElement(node: unknown): node is RegexElement {
  return typeof node === 'string' || isRegexOperator(node);
}

export function isRegexOperator(element: unknown): element is RegexOperator {
  return (
    typeof element === 'object' &&
    element !== null &&
    'encode' in element &&
    typeof element.encode === 'function'
  );
}

export function asRegExp(regex: RegExp | RegexElement | RegexElement[]) {
  if (regex instanceof RegExp) {
    return regex;
  }

  return buildRegExp(regex);
}
