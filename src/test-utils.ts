import { buildRegex } from './builders';
import type { RegexComponent } from './types';

export function execRegex(
  text: string,
  elements: Array<RegexComponent | string>
) {
  const regex = buildRegex(...elements);
  return [...regex.exec(text)!];
}
