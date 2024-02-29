import { choiceOf, nonWordBoundary, regex, wordBoundary } from '..';

test('example: find words with suffix', () => {
  const suffixesToFind = ['acy', 'ism'];

  const suffixRegex = regex([
    nonWordBoundary, // match suffixes only
    choiceOf(...suffixesToFind),
    wordBoundary,
  ]).build();

  expect(suffixRegex).toMatchString('democracy');
  expect(suffixRegex).toMatchString('Bureaucracy');
  expect(suffixRegex).toMatchString('abc privacy ');
  expect(suffixRegex).toMatchString('abc dynamism');
  expect(suffixRegex).toMatchString('realism abc');
  expect(suffixRegex).toMatchString('abc modernism abc');

  expect(suffixRegex).not.toMatchString('abc acy');
  expect(suffixRegex).not.toMatchString('ism abc');
  expect(suffixRegex).not.toMatchString('dynamisms');

  expect(suffixRegex).toEqualRegex(/\B(?:acy|ism)\b/);
});
