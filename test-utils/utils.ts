import { buildRegex } from '../src/builders';
import type { RegexComponentResult, RegexElement } from '../src/types';

export function isRegexElement(node: unknown): node is RegexElement {
  return typeof node === 'string' || isRegexComponentResult(node);
}

export function isRegexComponentResult(element: unknown): element is RegexComponentResult {
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

  return buildRegex(regex);
}
