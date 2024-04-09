import { buildRegExp, choiceOf, nonWordBoundary, wordBoundary } from '..';

test('example: find words with suffix', () => {
  const suffixesToFind = ['acy', 'ism'];

  const regex = buildRegExp([
    nonWordBoundary, // match suffixes only
    choiceOf(...suffixesToFind),
    wordBoundary,
  ]);

  expect(regex).toMatchString('democracy', { exactString: false });
  expect(regex).toMatchString('Bureaucracy', { exactString: false });
  expect(regex).toMatchString('abc privacy ', { exactString: false });
  expect(regex).toMatchString('abc dynamism', { exactString: false });
  expect(regex).toMatchString('realism abc', { exactString: false });
  expect(regex).toMatchString('abc modernism abc', { exactString: false });

  expect(regex).not.toMatchString('abc acy', { exactString: false });
  expect(regex).not.toMatchString('ism abc', { exactString: false });
  expect(regex).not.toMatchString('dynamisms', { exactString: false });

  expect(regex).toEqualRegex(/\B(?:acy|ism)\b/);
});
