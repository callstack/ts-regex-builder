import type { ChoiceOf, RegexElement } from '../types';
import type { CompileSingle, RegexNode } from '../types-internal';

export function choiceOf(...children: RegexElement[]): ChoiceOf {
  return {
    type: 'choiceOf',
    children,
  };
}

export function compileChoiceOf(
  element: ChoiceOf,
  compileSingle: CompileSingle
): RegexNode {
  const compileNodes = element.children.map(compileSingle);
  if (compileNodes.length === 1) {
    return compileNodes[0]!;
  }

  return {
    type: 'alternation',
    pattern: compileNodes.map((n) => n.pattern).join('|'),
  };
}
