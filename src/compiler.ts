import type { RegexElement } from './types';
import { characterClasses, isCharacterClass } from './character-classes';
import { baseQuantifiers, isBaseQuantifier } from './quantifiers/base';
import { compileRepeat } from './quantifiers/repeat';
import { escapeText } from './utils';

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(...elements: RegexElement[]): RegExp {
  const pattern = compileList(elements);
  return new RegExp(pattern);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(...elements: RegexElement[]): string {
  return compileList(elements);
}

// Recursive compilation

function compileList(elements: RegexElement[]): string {
  return elements.map((c) => compileSingle(c)).join('');
}

function compileSingle(element: RegexElement): string {
  if (typeof element === 'string') {
    return escapeText(element);
  }

  if (isCharacterClass(element)) {
    return characterClasses[element.type];
  }

  const compiledChildren = compileList(element.children);

  if (element.type === 'repeat') {
    return compileRepeat(element.config, compiledChildren);
  }

  if (isBaseQuantifier(element)) {
    const compiler = baseQuantifiers[element.type];
    return compiler(compiledChildren);
  }

  // @ts-expect-error User passed incorrect type
  throw new Error(`Unknown elements type ${element.type}`);
}
