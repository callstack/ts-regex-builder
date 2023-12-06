import type { ChoiceOf } from '../types';
import { wrapGroup } from '../utils';

export function choiceOf(...children: string[]): ChoiceOf {
  return {
    type: 'choiceOf',
    children,
  };
}

export function compileChoiceOf(element: ChoiceOf): string {
  return wrapGroup(element.children.join('|'));
}
