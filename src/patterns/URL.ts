//
//  A Regular Expression to validate URLs and to match URL components.
//  This regular expression is based on the RFC 3986 standard which defines the URL format.
//  URL = Scheme ":"["//" Authority]Path["?" Query]["#" Fragment]
//  Source: https://en.wikipedia.org/wiki/URL#External_links
//  Source: https://tools.ietf.org/html/rfc3986
//

import { buildRegExp } from '../builders';
import { endOfString, startOfString, wordBoundary } from '../constructs/anchors';
import { anyOf, charClass, charRange, digit } from '../constructs/character-class';

import { repeat } from '../constructs/repeat';
import { capture } from '../constructs/capture';
import { oneOrMore, optional } from '../constructs/quantifiers';
import { lookahead } from '../constructs/lookahead';

//
// The building blocks of the URL regex.
//
const lowercase = charRange('a', 'z');
const uppercase = charRange('A', 'Z');
const at = '@';
const equals = '=';
const hyphen = anyOf('-');
const alphabetical = charClass(lowercase, uppercase);
const specialChars = anyOf('._%+-');
const portSeperator = ':';
const schemeSeperator = ':';
const doubleSlash = '//';

const pathSeparator = '/';
const querySeparator = '?';
const fragmentSeparator = '#';
const usernameChars = charClass(lowercase, digit, specialChars);
const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-'));
const pathSpecialChars = anyOf(':@%._+~#=');
const queryDelimiter = anyOf('&;');

//
// Combining these building blocks into the following URL regex components:
//

//    Scheme:
//      The scheme is the first part of the URL and defines the protocol to be used.
//      Examples of popular schemes include http, https, ftp, mailto, file, data and irc.
//      A URL string must be a scheme, followed by a colon, followed by a scheme-specific part.
//

const urlScheme = [
  repeat(charClass(hyphen, alphabetical), { min: 3, max: 6 }),
  optional('s'),
  lookahead(schemeSeperator),
];

export const UrlSchemeFinder = buildRegExp([capture(urlScheme)], {
  ignoreCase: true,
  global: true,
});

export const UrlSchemeValidator = buildRegExp([startOfString, capture(urlScheme), endOfString], {
  ignoreCase: true,
});

//    Authority:
//      The authority part of a URL consists of three sub-parts:
//        1. An optional username, followed by an at symbol (@)
//        2. A hostname (e.g. www.google.com)
//        3. An optional port number, preceded by a colon (:)
//    Authority = [userinfo "@"] host [":" port]

const userInfo = oneOrMore(usernameChars);
const hostname = repeat(hostnameChars, { min: 1, max: 63 });
const hostnameEnd = capture([hostname, endOfString]);
const host = capture([oneOrMore([hostname, '.'])]);
const port = [portSeperator, oneOrMore(digit)];

const urlAuthority = [doubleSlash, optional([userInfo, at]), hostname, optional(port)];

export const UrlAuthorityFinder = buildRegExp(capture(urlAuthority), {
  ignoreCase: true,
  global: true,
});

export const UrlAuthorityValidator = buildRegExp(
  [startOfString, capture(urlAuthority), endOfString],
  { ignoreCase: true },
);

//
//    Convenience Pattern - Host:
//        A hostname (e.g. www.google.com)
//
const urlHost = [host, hostnameEnd, endOfString];

export const UrlHostFinder = buildRegExp(capture(urlHost), {
  ignoreCase: true,
  global: true,
});

export const UrlHostValidator = buildRegExp(capture(urlHost), {
  ignoreCase: true,
});

//    Path:
//      The path is the part of the URL that comes after the authority and before the query.
//      It consists of a sequence of path segments separated by a forward slash (/).
//      A path string must begin with a forward slash (/).

const pathSegment = [
  pathSeparator,
  optional(oneOrMore(charClass(lowercase, uppercase, digit, pathSpecialChars))),
];

const urlPath = oneOrMore(pathSegment);

export const UrlPathFinder = buildRegExp(urlPath, {
  ignoreCase: true,
  global: true,
});

export const UrlPathValidator = buildRegExp(urlPath, { ignoreCase: true });

//    Query:
//      The query part of a URL is optional and comes after the path.
//      It is separated from the path by a question mark (?).
//      The query string consists of a sequence of field-value pairs separated by an ampersand (&).
//      Each field-value pair is separated by an equals sign (=).

const queryKey = oneOrMore(charClass(lowercase, uppercase, digit, anyOf('_-')));
const queryValue = oneOrMore(charClass(lowercase, uppercase, digit, anyOf('_-')));

const queryKeyValuePair = buildRegExp([queryKey, equals, queryValue]);

const urlQuery = [querySeparator, oneOrMore([queryKeyValuePair, optional(queryDelimiter)])];

export const UrlQueryFinder = buildRegExp(urlQuery, {
  ignoreCase: true,
  global: true,
});

export const UrlQueryValidator = buildRegExp(urlQuery, { ignoreCase: true });

//    Fragment:
//      The fragment part of a URL is optional and comes after the query.
//      It is separated from the query by a hash (#).
//      The fragment string consists of a sequence of characters.

const urlFragment = [
  fragmentSeparator,
  oneOrMore(charClass(lowercase, uppercase, digit, pathSpecialChars)),
];

export const UrlFragmentFinder = buildRegExp(urlFragment, {
  ignoreCase: true,
  global: true,
});

export const UrlFragmentValidator = buildRegExp(urlFragment, {
  ignoreCase: true,
});

const url = capture([
  startOfString,
  optional(urlScheme),
  schemeSeperator,
  optional(urlAuthority),
  urlPath,
  optional(urlQuery),
  optional(urlFragment),
  endOfString,
]);

/***
 ***  Find URL strings in a text.
 ***/
export const urlFinder = buildRegExp([wordBoundary, url, wordBoundary], {
  ignoreCase: true,
  global: true,
});

/***
 ***  Check that given text is a valid URL.
 ***/
export const urlValidator = buildRegExp(
  [
    startOfString,
    optional(urlScheme),
    schemeSeperator,
    optional(urlAuthority),
    urlPath,
    optional(urlQuery),
    optional(urlFragment),
    endOfString,
  ],
  { ignoreCase: true },
);
