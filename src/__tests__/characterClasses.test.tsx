import { whitespace } from '../characterClasses';
import { buildPattern } from '../compiler';
import { one } from '../quantifiers';

test('"whitespace" character class', () => {
  expect(buildPattern(whitespace())).toEqual(`\\s`);
  expect(buildPattern(one('ab'), whitespace())).toEqual(`ab\\s`);
  expect(buildPattern(one('ab'), whitespace(), one('c'))).toEqual(`ab\\sc`);
});
