import { buildRegExp } from '../src/builders';
import type { RegexConstruct, RegexElement, RegexSequence } from '../src/types';

export function isRegexElement(node: unknown): node is RegexElement {
  return typeof node === 'string' || isRegexConstruct(node);
}

export function isRegexConstruct(element: unknown): element is RegexConstruct {
  return (
    typeof element === 'object' &&
    element !== null &&
    'encode' in element &&
    typeof element.encode === 'function'
  );
}

export function wrapRegExp(regex: RegExp | RegexSequence) {
  if (regex instanceof RegExp) {
    return regex;
  }

  return buildRegExp(regex);
}
