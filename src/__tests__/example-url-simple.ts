import {
  anyOf,
  buildRegExp,
  charClass,
  charRange,
  choiceOf,
  digit,
  endOfString,
  oneOrMore,
  optional,
  startOfString,
  zeroOrMore,
} from '..';

// Modified from: https://stackoverflow.com/a/2015516
test('example: simple url validation', () => {
  const protocol = [choiceOf('http', 'https'), '://'];
  const domainChars = charClass(charRange('a', 'z'), digit);
  const domainCharsHyphen = charClass(domainChars, anyOf('-'));

  const domainSegment = choiceOf(
    domainChars, // single char
    [domainChars, zeroOrMore(domainCharsHyphen), domainChars], // multi char
  );

  const regex = buildRegExp([
    startOfString,
    optional(protocol),
    oneOrMore([domainSegment, '.']), // domain segment
    charRange('a', 'z'), // TLD first char
    oneOrMore(domainChars), // TLD remaining chars
    endOfString,
  ]);

  expect(regex).toMatchString('example.com');
  expect(regex).toMatchString('beta.example.com');
  expect(regex).toMatchString('http://beta.example.com');
  expect(regex).toMatchString('https://beta.example.com');
  expect(regex).toMatchString('a.co');

  expect(regex).not.toMatchString('example');
  expect(regex).not.toMatchString('aaa.a');
  expect(regex).not.toMatchString('a.-a.com');
  expect(regex).not.toMatchString('a.-a.com');
  expect(regex).not.toMatchString('@gmail.com');

  expect(regex).toEqualRegex(
    // eslint-disable-next-line no-useless-escape
    /^(?:(?:http|https):\/\/)?(?:(?:[a-z\d]|[a-z\d][a-z\d\-]*[a-z\d])\.)+[a-z][a-z\d]+$/,
  );
});
