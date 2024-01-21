import {
  anyOf,
  buildRegExp,
  charClass,
  charRange,
  digit,
  endOfString,
  oneOrMore,
  repeat,
  startOfString,
} from '../index';

test('example: email validation', () => {
  const usernameChars = charClass(charRange('a', 'z'), digit, anyOf('._%+-'));
  const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-.'));
  const domainChars = charRange('a', 'z');

  const regex = buildRegExp(
    [
      startOfString,
      oneOrMore(usernameChars),
      '@',
      oneOrMore(hostnameChars),
      '.',
      repeat(domainChars, { min: 2 }),
      endOfString,
    ],
    { ignoreCase: true },
  );

  expect(regex).toMatchString('aaa@gmail.co');
  expect(regex).toMatchString('aaa@gmail.com');
  expect(regex).toMatchString('Aaa@GMail.Com');
  expect(regex).toMatchString('aaa@long.domain.example.com');

  expect(regex).not.toMatchString('@');
  expect(regex).not.toMatchString('aaa@');
  expect(regex).not.toMatchString('a@gmail.c');
  expect(regex).not.toMatchString('@gmail.com');

  expect(regex).toEqualRegex(/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i);
});
