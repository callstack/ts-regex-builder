import { buildPattern, buildRegex } from './builders';
import type { RegexElement } from './components/types';

export function execRegex(
  text: string,
  elements: Array<RegexElement | string>
) {
  const regex = buildRegex(...elements);
  const result = regex.exec(text);
  return result ? [...result] : null;
}

export function expectPattern(...elements: Array<RegexElement | string>) {
  const pattern = buildPattern(...elements);
  // eslint-disable-next-line jest/valid-expect
  return expect(pattern);
}
