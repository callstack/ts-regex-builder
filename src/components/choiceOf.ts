import type { ChoiceOf, RegexElement } from '../types';
import type { CompileSingle } from '../types-internal';
import { wrapGroup } from '../utils';

export function choiceOf(...children: RegexElement[]): ChoiceOf {
  return {
    type: 'choiceOf',
    children,
  };
}

export function compileChoiceOf(
  element: ChoiceOf,
  compileSingle: CompileSingle
): string {
  const compiledChildren = element.children.map(compileSingle);
  return wrapGroup(compiledChildren.join('|'));
}
