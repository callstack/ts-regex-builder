import { any, buildRegExp, capture, oneOrMore, zeroOrMore } from '..';

test('example: html tag matching', () => {
  const tagName = capture(oneOrMore(/[a-z0-9]/), { name: 'tag' });
  const tagContent = capture(zeroOrMore(any, { greedy: false }), { name: 'content' });

  const tagMatcher = buildRegExp(['<', tagName, '>', tagContent, '</', tagName.ref(), '>'], {
    ignoreCase: true,
    global: true,
  });

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
