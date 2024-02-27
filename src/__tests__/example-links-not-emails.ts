import {
  anyOf,
  buildRegExp,
  capture,
  charClass,
  charRange,
  digit,
  endOfString,
  negativeLookahead,
  oneOrMore,
  optional,
  repeat,
  startOfString,
} from '../index';

//
// URL:
//      URL = Scheme ":"["//" Authority]Path["?" Query]["#" Fragment]
//  https://en.wikipedia.org/wiki/URL#External_links

//
// The building blocks of the URL regex.
//
const lowercase = charRange('a', 'z');
const uppercase = charRange('A', 'Z');
const hyphen = anyOf('-');
const alphabetical = charClass(lowercase, uppercase);
const specialChars = anyOf('._%+-');
const portSeperator = ':';
const schemeSeperator = ':';
const doubleSlash = '//';
const at = '@';
const pathSeparator = '/';
const querySeparator = '?';
const fragmentSeparator = '#';
const usernameChars = charClass(lowercase, digit, specialChars);
const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-'));
const domainChars = charRange('a', 'z');

//
// Scheme:
//      The scheme is the first part of the URL and defines the protocol to be used.
//      Examples of popular schemes include http, https, ftp, mailto, file, data and irc.
//      A URL string must be a scheme, followed by a colon, followed by a scheme-specific part.
//
const Scheme = [repeat(charClass(hyphen, alphabetical), { min: 3, max: 6 }), optional('s')];

const scheme = buildRegExp([startOfString, capture(Scheme), endOfString], {
  global: false,
  ignoreCase: true,
});

test('Matching the Schema components.', () => {
  expect(scheme).toMatchString('ftp');
  expect(scheme).not.toMatchString('ftp:');
  expect(scheme).not.toMatchString('h');
  expect(scheme).not.toMatchString('nameiswaytoolong');
  expect(scheme).toMatchString('HTTPS');
  expect(scheme).toMatchString('http');
});

//
// Authority:
//      The authority part of a URL consists of three sub-parts:
//      1. An optional username, followed by an at symbol (@)
//      2. A hostname (e.g. www.google.com)
//      3. An optional port number, preceded by a colon (:)
// Authority = [userinfo "@"] host [":" port]
//
const userInfo = oneOrMore(usernameChars);
const hostname = repeat(hostnameChars, { min: 1, max: 63 });
const hostnameEnd = capture([hostname, endOfString]);
const host = capture([oneOrMore([hostname, '.'])]);
const port = [portSeperator, oneOrMore(digit)];

const Authority = [doubleSlash, optional([userInfo, at]), hostname, optional(port)];

const authorityRegex = buildRegExp([startOfString, capture(Authority), endOfString], {
  ignoreCase: true,
});

const hostEx = buildRegExp([startOfString, host, hostnameEnd, endOfString], { ignoreCase: true });

test('Matching the hostname component.', () => {
  expect(hostEx).toMatchString('www.google.com');
  expect(hostEx).not.toMatchString('www.google.com.');
});

test('Matching the Authority components.', () => {
  expect(authorityRegex).toMatchString('//davidbowie@localhost:8080');
  expect(authorityRegex).toMatchString('//localhost:1234');
  expect(authorityRegex).not.toMatchString('davidbowie@localhost:1972');
  expect(authorityRegex).not.toMatchString('nameiswaytoolong');
});

//
// Path:
//      The path is the part of the URL that comes after the authority and before the query.
//      It consists of a sequence of path segments separated by a forward slash (/).
//      A path string must begin with a forward slash (/).
//

const pathSegment = [
  pathSeparator,
  optional(oneOrMore(charClass(lowercase, uppercase, digit, anyOf(':@%._+~#=')))),
];

const Path = oneOrMore(pathSegment);

const path = buildRegExp([startOfString, capture(Path), endOfString], {
  global: false,
  ignoreCase: true,
});

test('Matching the Path components.', () => {
  expect(path).toMatchString('/');
  expect(path).not.toMatchString('');
  expect(path).toMatchString('/a');
  expect(path).not.toMatchString('a');
  expect(path).not.toMatchString('a/');
  expect(path).toMatchString('/a/b');
  expect(path).not.toMatchString('a/b');
  expect(path).not.toMatchString('a/b/');
});

//
// Query:
//      The query part of a URL is optional and comes after the path.
//      It is separated from the path by a question mark (?).
//      The query string consists of a sequence of field-value pairs separated by an ampersand (&).
//      Each field-value pair is separated by an equals sign (=).
//

const queryKey = oneOrMore(charClass(lowercase, uppercase, digit, anyOf('_-')));
const queryValue = oneOrMore(charClass(lowercase, uppercase, digit, anyOf('_-')));

const queryDelimiter = anyOf('&;');
const equals = '=';

const queryKVPair = buildRegExp([queryKey, equals, queryValue]);

const Query = [querySeparator, oneOrMore([queryKVPair, optional(queryDelimiter)])];

const query = buildRegExp([startOfString, capture(Query), endOfString], {
  global: false,
  ignoreCase: true,
});

test('Matching the Query components.', () => {
  expect(query).not.toMatchString('');
  expect(query).not.toMatchString('??');
  expect(query).not.toMatchString('?');
  expect(query).not.toMatchString('?a-b');
  expect(query).toMatchString('?a=b');
  expect(query).toMatchString('?a=b&c=d');
  expect(query).not.toMatchString('a=b&c-d');
});

//
// Fragment:
//      The fragment part of a URL is optional and comes after the query.
//      It is separated from the query by a hash (#).
//      The fragment string consists of a sequence of characters.
//
const Fragment = [
  fragmentSeparator,
  oneOrMore(charClass(lowercase, uppercase, digit, anyOf(':@%._+~#=&'))),
];

const fragment = buildRegExp([startOfString, capture(Fragment), endOfString], {
  global: false,
  ignoreCase: true,
});

test('Matching the Fragment components.', () => {
  expect(fragment).not.toMatchString('');
  expect(fragment).toMatchString('#section1');
  expect(fragment).not.toMatchString('#');
});

const Url = [
  optional(Scheme),
  schemeSeperator,
  optional(Authority),
  Path,
  optional(Query),
  optional(Fragment),
];

const urlRegex = buildRegExp([startOfString, capture(Url), endOfString], {
  ignoreCase: true,
});

test('Matching URL components.', () => {
  expect(urlRegex).not.toMatchString('');
  expect(urlRegex).not.toMatchString('http');
  expect(urlRegex).toMatchString('http://localhost:8080');
  expect(urlRegex).toMatchString('http://localhost:8080/users/paul/research/data.json');
  expect(urlRegex).toMatchString(
    'http://localhost:8080/users/paul/research/data.json?request=regex&email=me',
  );
  expect(urlRegex).toMatchString(
    'http://localhost:8080/users/paul/research/data.json?request=regex&email=me#section1',
  );
});

const Email = [
  oneOrMore(usernameChars),
  '@',
  oneOrMore(hostnameChars),
  '.',
  repeat(domainChars, { min: 2 }),
];

const emailRegex = buildRegExp([startOfString, capture(Email), endOfString], {
  ignoreCase: true,
});

test('Matching email addresses.', () => {
  expect(emailRegex).not.toMatchString('');
  expect(emailRegex).toMatchString('stevenwilson@porcupinetree.com');
  expect(emailRegex).not.toMatchString('stevenwilson@porcupinetree');
});

const selectLinksNotEmails = buildRegExp(
  [startOfString, urlRegex, negativeLookahead(emailRegex), endOfString],
  {
    ignoreCase: true,
  },
);

test('Matching URLs.', () => {
  expect(selectLinksNotEmails).toMatchString('http://localhost:8080');
  expect(selectLinksNotEmails).toMatchString(
    'http://paul@localhost:8080/users/paul/research/data.json?request=regex&email=me#section1',
  );
  expect(selectLinksNotEmails).toMatchString('ftp://data/#January');
  expect(selectLinksNotEmails).not.toMatchString('https:');
  expect(selectLinksNotEmails).not.toMatchString('piotr@riverside.com');
  expect(selectLinksNotEmails).toMatchString('http://www.google.com');
  expect(selectLinksNotEmails).toMatchString('https://www.google.com?search=regex');
  expect(selectLinksNotEmails).not.toMatchString('www.google.com?search=regex&email=me');
  expect(selectLinksNotEmails).toMatchString('mailto://paul@thebeatles.com');
  expect(selectLinksNotEmails).not.toMatchString('ftphttpmailto://neal@nealmorse');
});
