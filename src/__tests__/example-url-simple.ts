import {
  anyOf,
  charClass,
  charRange,
  choiceOf,
  digit,
  endOfString,
  oneOrMore,
  optional,
  regex,
  startOfString,
  zeroOrMore,
} from '..';

// Modified from: https://stackoverflow.com/a/2015516
test('example: simple url validation', () => {
  const protocol = [choiceOf('http', 'https'), '://'];
  const domainChars = charClass(charRange('a', 'z'), digit);
  const domainCharsHypen = charClass(domainChars, anyOf('-'));

  const domainSegment = choiceOf(
    domainChars, // single char
    [domainChars, zeroOrMore(domainCharsHypen), domainChars], // multi char
  );

  const urlValidator = regex([
    startOfString,
    optional(protocol),
    oneOrMore([domainSegment, '.']), // domain segment
    charRange('a', 'z'), // TLD first char
    oneOrMore(domainChars), // TLD remaining chars
    endOfString,
  ]).build();

  expect(urlValidator).toMatchString('example.com');
  expect(urlValidator).toMatchString('beta.example.com');
  expect(urlValidator).toMatchString('http://beta.example.com');
  expect(urlValidator).toMatchString('https://beta.example.com');
  expect(urlValidator).toMatchString('a.co');

  expect(urlValidator).not.toMatchString('example');
  expect(urlValidator).not.toMatchString('aaa.a');
  expect(urlValidator).not.toMatchString('a.-a.com');
  expect(urlValidator).not.toMatchString('a.-a.com');
  expect(urlValidator).not.toMatchString('@gmail.com');

  expect(urlValidator).toEqualRegex(
    /^(?:(?:http|https):\/\/)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+[a-z][a-z\d]+$/,
  );
});
