import type { RepeatConfig } from '../types';
import { wrapGroup } from '../utils';

export function compileRepeat(
  config: RepeatConfig,
  compiledChildren: string
): string {
  if ('count' in config && typeof config.count === 'number') {
    return `${wrapGroup(compiledChildren)}{${config.count}}`;
  }

  if ('min' in config && typeof config.min === 'number') {
    return `${wrapGroup(compiledChildren)}{${config.min},${config?.max ?? ''}}`;
  }

  return `${wrapGroup(compiledChildren)}`;
}
