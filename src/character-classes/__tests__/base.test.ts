import { any, digit, whitespace, word } from '../base';
import { buildPattern } from '../../compiler';
import { one } from '../../quantifiers/base';

test('"whitespace" character class', () => {
  expect(buildPattern(whitespace)).toEqual(`\\s`);

  expect(buildPattern(one('ab'), whitespace)).toEqual(`ab\\s`);

  expect(buildPattern(one('ab'), whitespace, one('c'))).toEqual(`ab\\sc`);
});

test('"digit" character class', () => {
  expect(buildPattern(digit)).toEqual(`\\d`);

  expect(buildPattern(one('ab'), digit)).toEqual(`ab\\d`);

  expect(buildPattern(one('ab'), digit, one('c'))).toEqual(`ab\\dc`);
});

test('"word" character class', () => {
  expect(buildPattern(word)).toEqual(`\\w`);

  expect(buildPattern(one('ab'), word)).toEqual(`ab\\w`);

  expect(buildPattern(one('ab'), word, one('c'))).toEqual(`ab\\wc`);
});

test('"any" character class', () => {
  expect(buildPattern(any)).toEqual(`.`);

  expect(buildPattern(one('ab'), any)).toEqual(`ab.`);

  expect(buildPattern(one('ab'), any, one('c'))).toEqual(`ab.c`);
});
