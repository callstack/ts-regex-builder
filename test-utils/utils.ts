import { buildRegex } from '../src/builders';
import type { RegexElement, RegexEncodable } from '../src/types';

export function isRegexElement(node: unknown): node is RegexElement {
  return typeof node === 'string' || isRegexEncodable(node);
}

export function isRegexEncodable(element: unknown): element is RegexEncodable {
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
