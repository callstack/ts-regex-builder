import { buildRegex } from '.';
import type { RegexElement } from './types';

export function execRegex(text: string, elements: RegexElement[]) {
  const regex = buildRegex(...elements);
  return [...regex.exec(text)!];
}

export function execRegexFull(text: string, elements: RegexElement[]) {
  const regex = buildRegex(...elements);
  return regex.exec(text)!;
}
