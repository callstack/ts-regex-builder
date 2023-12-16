import type { RegexElement } from './components/types';
import { buildRegex } from '.';

export function execRegex(
  text: string,
  elements: Array<RegexElement | string>
) {
  const regex = buildRegex(...elements);
  return [...regex.exec(text)!];
}

export function execRegexFull(
  text: string,
  elements: Array<RegexElement | string>
) {
  const regex = buildRegex(...elements);
  return regex.exec(text)!;
}
