import type { RepeatConfig } from '../types';
import { wrapGroup } from '../utils';

export function compileRepeat(
  config: RepeatConfig,
  compiledChildren: string
): string {
  if ('count' in config) {
    return `${wrapGroup(compiledChildren)}{${config.count}}`;
  }

  if ('min' in config) {
    return `${wrapGroup(compiledChildren)}{${config.min},${config?.max ?? ''}}`;
  }

  return `${wrapGroup(compiledChildren)}`;
}
