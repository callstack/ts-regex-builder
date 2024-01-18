import { buildRegExp } from '../src/builders';
import type { RegexComponent, RegexElement } from '../src/types';

export function isRegexElement(node: unknown): node is RegexElement {
  return typeof node === 'string' || isRegexComponentResult(node);
}

export function isRegexComponentResult(element: unknown): element is RegexComponent {
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
