import type { Repeat } from '../types';
import { wrapGroup } from '../utils';

export function repeat(
  compiledChildren: string,
  config: Repeat['config']
): string {
  if ('count' in config && typeof config?.count === 'number') {
    return `${wrapGroup(compiledChildren)}{${config?.count || ''}}`;
  }

  if ('min' in config) {
    return `${wrapGroup(compiledChildren)}{${config?.min || ''},${
      config?.max || ''
    }}`;
  }

  return `${wrapGroup(compiledChildren)}`;
}
