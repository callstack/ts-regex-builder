import type { RegexElement } from '../components/types';

export function isRegexElement(element: unknown): element is RegexElement {
  return (
    typeof element === 'string' ||
    (typeof element === 'object' && element !== null && 'type' in element)
  );
}

export function asElementArray(
  elementOrArray: RegexElement | RegexElement[]
): RegexElement[] {
  return Array.isArray(elementOrArray) ? elementOrArray : [elementOrArray];
}
