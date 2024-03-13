import {
  any,
  buildRegExp,
  capture,
  charClass,
  charRange,
  digit,
  oneOrMore,
  reference,
  zeroOrMore,
} from '..';

test('example: html tag matching', () => {
  const tagName = oneOrMore(charClass(charRange('a', 'z'), digit));
  const tagContent = zeroOrMore(any, { greedy: false });

  const tagRef = reference('tag');
  const tagMatcher = buildRegExp(
    [
      '<',
      capture(tagName, { name: tagRef }),
      '>',
      capture(tagContent, { name: 'content' }),
      '</',
      tagRef,
      '>',
    ],
    { ignoreCase: true, global: true },
  );

  expect(tagMatcher).toMatchAllNamedGroups('<a>abc</a>', [{ tag: 'a', content: 'abc' }]);
  expect(tagMatcher).toMatchAllNamedGroups('<a><b>abc</b></a>', [
    { tag: 'a', content: '<b>abc</b>' },
  ]);
  expect(tagMatcher).toMatchAllNamedGroups('<a>abc1</a><b>abc2</b>', [
    { tag: 'a', content: 'abc1' },
    { tag: 'b', content: 'abc2' },
  ]);

  expect(tagMatcher).not.toMatchString('<a>abc</b>');

  expect(tagMatcher).toEqualRegex('<(?<tag>[a-z\\d]+)>(?<content>.*?)<\\/\\k<tag>>');
});
