import type { RegexElement, Repeat, RepeatConfig } from '../types';
import { wrapGroup } from '../utils';

export function repeat(
  config: RepeatConfig,
  ...children: RegexElement[]
): Repeat {
  return {
    type: 'repeat',
    children,
    config,
  };
}

export function compileRepeat(
  config: RepeatConfig,
  compiledChildren: string
): string {
  if ('count' in config) {
    return `${wrapGroup(compiledChildren)}{${config.count}}`;
  }

  return `${wrapGroup(compiledChildren)}{${config.min},${config?.max ?? ''}}`;
}
