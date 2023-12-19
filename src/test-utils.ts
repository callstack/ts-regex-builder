import { buildRegex } from './builders';
import type { RegexElement } from './types';

export function execRegex(
  text: string,
  elements: Array<RegexElement | string>
) {
  const regex = buildRegex(...elements);
  return [...regex.exec(text)!];
}
