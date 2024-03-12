import {
  anyOf,
  buildRegExp,
  charClass,
  charRange,
  digit,
  endOfString,
  namedCapture,
  oneOrMore,
  repeat,
  startOfString,
} from '..';

//
// Example: email validation building blocks
//
const upperCase = charRange('A', 'Z');
const lowerCase = charRange('a', 'z');
const specialChars = anyOf("!#$%&'*+/=?^_`{|}~-");
const usernameChars = charClass(upperCase, lowerCase, digit, specialChars);
const hostnameChars = charClass(upperCase, lowerCase, digit, specialChars);
const domainChars = charRange('a', 'z');
const emailSeparator = anyOf('.');
const domainSeparator = anyOf('@');

//
// Example: email validation majour components using named capture.
//
const username = namedCapture(oneOrMore(usernameChars), 'username');

const usernameRegex = buildRegExp([startOfString, username, endOfString]);

test('Matching the Username component.', () => {
  expect(usernameRegex).toMatchString('john1234');
  expect(usernameRegex).toMatchString('ringo$1234');
  expect(usernameRegex).not.toMatchString('john@1234');
  expect(usernameRegex).not.toMatchString('george.harrison');
  expect(usernameRegex).not.toMatchString('paul.mccartney&wings');
  expect(usernameRegex).not.toMatchString('ringo starr');
});

const hostname = namedCapture(oneOrMore(hostnameChars), 'hostname');

const hostnameRegex = buildRegExp([startOfString, hostname, endOfString]);

test('Matching the Hostname component.', () => {
  expect(hostnameRegex).toMatchString('gmail');
  expect(hostnameRegex).toMatchString('google');
  expect(hostnameRegex).toMatchString('g-mail');
  expect(hostnameRegex).toMatchString('g_mail');
  expect(hostnameRegex).not.toMatchString('g mail');
  expect(hostnameRegex).not.toMatchString('g.mail');
});

const domain = namedCapture(repeat(domainChars, { min: 2 }), 'domain');

const domainRegex = buildRegExp([startOfString, domain, endOfString]);

test('Matching the Domain component.', () => {
  expect(domainRegex).toMatchString('com');
  expect(domainRegex).toMatchString('org');
  expect(domainRegex).not.toMatchString('c');
  expect(domainRegex).not.toMatchString('o');
  expect(domainRegex).toMatchString('co');
});

test('example: email validation', () => {
  const regex = buildRegExp(
    [startOfString, username, domainSeparator, hostname, emailSeparator, domain, endOfString],
    { ignoreCase: true },
  );

  expect(regex).toMatchString('aaa@gmail.co');
  expect(regex).toMatchString('aaa@gmail.com');
  expect(regex).toMatchString('Aaa@GMail.Com');
  expect(regex).not.toMatchString('aaa@long.domain.example.com');

  expect(regex).not.toMatchString('@');
  expect(regex).not.toMatchString('aaa@');
  expect(regex).not.toMatchString('a@gmail.c');
  expect(regex).not.toMatchString('@gmail.com');

  const emailAddress = 'abba@gold.com';
  const match = regex.exec(emailAddress);
  expect(match).not.toBeNull();
  expect(match?.groups).not.toBeNull();
  expect(match?.groups?.username).toBe('abba');
  expect(match?.groups?.hostname).toBe('gold');
  expect(match?.groups?.domain).toBe('com');
});
