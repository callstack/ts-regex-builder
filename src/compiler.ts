import type { RegexElement } from './types';
import { RegexNodePriority, type RegexNode } from './types-internal';
import { compileChoiceOf } from './components/choiceOf';
import { compileCharacterClass } from './character-classes/compiler';
import { baseQuantifiers, isBaseQuantifier } from './quantifiers/base';
import { compileRepeat } from './quantifiers/repeat';
import { concatNodes, escapeText } from './utils';

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(...elements: RegexElement[]): RegExp {
  const pattern = compileList(elements).pattern;
  return new RegExp(pattern);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(...elements: RegexElement[]): string {
  return compileList(elements).pattern;
}

// Recursive compilation

function compileList(elements: RegexElement[]): RegexNode {
  return concatNodes(elements.map((c) => compileSingle(c)));
}

function compileSingle(element: RegexElement): RegexNode {
  if (typeof element === 'string') {
    return {
      priority:
        element.length === 1
          ? RegexNodePriority.Atom
          : RegexNodePriority.Sequence,
      pattern: escapeText(element),
    };
  }

  if (element.type === 'characterClass') {
    return compileCharacterClass(element);
  }

  if (element.type === 'choiceOf') {
    return compileChoiceOf(element, compileSingle);
  }

  if (element.type === 'repeat') {
    const compiledChildren = compileList(element.children);
    return compileRepeat(element.config, compiledChildren);
  }

  if (isBaseQuantifier(element)) {
    const compiledChildren = compileList(element.children);
    const compiler = baseQuantifiers[element.type];
    return compiler(compiledChildren);
  }

  // @ts-expect-error User passed incorrect type
  throw new Error(`Unknown elements type ${element.type}`);
}
