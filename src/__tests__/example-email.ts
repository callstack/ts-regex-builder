import {
  anyOf,
  charClass,
  charRange,
  digit,
  endOfString,
  oneOrMore,
  regex,
  repeat,
  startOfString,
} from '..';

test('example: email validation', () => {
  const usernameChars = charClass(charRange('a', 'z'), digit, anyOf('._%+-'));
  const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-.'));
  const domainChars = charRange('a', 'z');

  const emailRegex = regex([
    startOfString,
    oneOrMore(usernameChars),
    '@',
    oneOrMore(hostnameChars),
    '.',
    repeat(domainChars, { min: 2 }),
    endOfString,
  ]).build({
    ignoreCase: true,
  });

  expect(emailRegex).toMatchString('aaa@gmail.co');
  expect(emailRegex).toMatchString('aaa@gmail.com');
  expect(emailRegex).toMatchString('Aaa@GMail.Com');
  expect(emailRegex).toMatchString('aaa@long.domain.example.com');

  expect(emailRegex).not.toMatchString('@');
  expect(emailRegex).not.toMatchString('aaa@');
  expect(emailRegex).not.toMatchString('a@gmail.c');
  expect(emailRegex).not.toMatchString('@gmail.com');

  expect(emailRegex).toEqualRegex(/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i);
});
