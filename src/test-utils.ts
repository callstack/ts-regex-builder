import { buildRegex } from './builders';
import type { RegexElement } from './components/types';

export function execRegex(
  text: string,
  elements: Array<RegexElement | string>
) {
  const regex = buildRegex(...elements);
  const result = regex.exec(text);
  return result ? [...result] : null;
}
