import { buildRegExp } from '../src/builders';
import type { RegexSequence } from '../src/types';

export function wrapRegExp(regex: RegExp | RegexSequence) {
  if (regex instanceof RegExp) {
    return regex;
  }

  return buildRegExp(regex);
}
