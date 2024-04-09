//
//  A Regular Expression to validate URLs and to match URL components.
//  This regular expression is based on the RFC 3986 standard which defines the URL format.
//
//  URL = Scheme ":"["//" Authority]Path["?" Query]["#" Fragment]
//
//  This pattern is designed to match WEB URLs, and does not support all possible URL schemes.
//  Source: https://en.wikipedia.org/wiki/URL#External_links
//  Source: https://datatracker.ietf.org/doc/html/rfc1738
//  Source: https://datatracker.ietf.org/doc/html/rfc3986
//
//  Current limitations:
//     - Does not support URL Authorities with passwords.  This pattern is generally considered deprecated.
//     - URLs of the form 'http://' are considered valid.  This is not a valid URL, but it is a valid URI.
//     - Only URL Queries of the form 'x=y' are considered valid.  Single values without an equals sign are not supported.
//

import { buildRegExp } from '../builders';
import { endOfString, startOfString } from '../constructs/anchors';
//import { capture } from '../constructs/capture';
import { anyOf, charClass, digit } from '../constructs/character-class';
import { choiceOf } from '../constructs/choice-of';
import { lookahead } from '../constructs/lookahead';
import { negativeLookahead } from '../constructs/negative-lookahead';
import { oneOrMore, optional, zeroOrMore } from '../constructs/quantifiers';
import { regex } from '../constructs/regex';
import { repeat } from '../constructs/repeat';

import { alphabetical, lowercase, uppercase } from './atoms';
import { ipv4Address, ipv6Address } from './ip-addr';

//    Scheme:
//      The scheme is the first part of the URL and defines the protocol to be used.
//      Examples of popular schemes include http, https, ftp, mailto, file, data and irc.
//      A URL string must be a scheme, followed by a colon, followed by a scheme-specific part.
//
const schemeSpecialChars = anyOf('+-.');
const schemeChar = charClass(alphabetical, digit, schemeSpecialChars);
const schemeSeperator = ':';

const schemePlural = regex([
  alphabetical,
  repeat(schemeChar, { min: 2, max: 4, greedy: false }),
  's',
]);

const schemeSingular = regex([alphabetical, repeat(schemeChar, { min: 2, max: 5, greedy: false })]);

export const urlScheme = buildRegExp([
  choiceOf(schemePlural, schemeSingular),
  lookahead(schemeSeperator),
]);

export const urlSchemeFinder = buildRegExp([urlScheme, schemeSeperator], {
  ignoreCase: false,
  global: true,
});

export const urlSchemeValidator = buildRegExp(
  [startOfString, urlScheme, schemeSeperator, endOfString],
  {
    ignoreCase: false,
    global: false,
  },
);

//    Authority:
//      The authority part of a URL consists of three sub-parts:
//        1. An optional username, followed by an at symbol (@)
//        2. A hostname (e.g. www.google.com)
//        3. An optional port number, preceded by a colon (:)
//    Authority = [userinfo "@"] host [":" port]
//
const userinfoSpecialChars = anyOf('._%+-');
const userinfoChars = charClass(lowercase, digit, userinfoSpecialChars);
const userinfo = oneOrMore(userinfoChars);
const userinfoSeperator = '@';

const hostnameSpecialChars = anyOf('-');
const hostnameChars = charClass(lowercase, digit, hostnameSpecialChars);
const hostSeperator = '.';
const port = repeat(digit, { min: 1, max: 5, greedy: false });
const portSeperator = ':';
const urlPort = regex([portSeperator, port]);
const host = repeat(hostnameChars, { min: 1, max: 63, greedy: true });
const hostname = regex([host, repeat([hostSeperator, host], { min: 0, max: 255, greedy: false })]);
const authoritySeperator = '//';

export const urlAuthority = regex([
  optional([userinfo, userinfoSeperator]),
  choiceOf(hostname, ipv4Address, ipv6Address),
  optional(urlPort),
]);

export const urlAuthorityFinder = buildRegExp(urlAuthority, {
  ignoreCase: false,
  global: true,
});

export const urlAuthorityValidator = buildRegExp([startOfString, urlAuthority, endOfString]);

//
//    Convenience Pattern - Host:
//        A hostname (e.g. www.google.com)
//

export const urlHost = choiceOf(hostname, ipv4Address, ipv6Address);
//export const urlHost = host;

export const urlHostFinder = buildRegExp(hostname, {
  ignoreCase: false,
  global: true,
});

export const urlHostValidator = buildRegExp([startOfString, regex(hostname), endOfString], {
  ignoreCase: false,
  global: false,
});

//    Path:
//      The path is the part of the URL that comes after the authority and before the query.
//      It consists of a sequence of path segments separated by a forward slash (/).
//      A path string must begin with a forward slash (/).

const pathSeparator = '/';
const pathSpecialChars = anyOf('_-()+');
const pathChar = charClass(lowercase, uppercase, digit, pathSpecialChars);
const pathSegment = regex([pathSeparator, repeat(pathChar, { min: 0, max: 63, greedy: false })]);

export const urlPath = buildRegExp(repeat(pathSegment, { min: 0, max: 255, greedy: false }));

export const urlPathFinder = buildRegExp(urlPath, {
  ignoreCase: false,
  global: true,
});

export const urlPathValidator = buildRegExp([startOfString, urlPath, endOfString], {
  ignoreCase: false,
  global: false,
});

//    Query:
//      The query part of a URL is optional and comes after the path.
//      It is separated from the path by a question mark (?).
//      The query string consists of a sequence of field-value pairs separated by an ampersand (&).
//      Each field-value pair is separated by an equals sign (=).
//
const equals = '=';
const querySeparator = '?';
const queryDelimiter = anyOf('&;');
const queryChars = charClass(lowercase, uppercase, digit, anyOf('_-'));
const queryKey = oneOrMore(queryChars);
const queryValue = oneOrMore(queryChars);
const queryKeyValuePair = regex([queryKey, equals, queryValue]);

export const urlQuery = regex([
  querySeparator,
  queryKeyValuePair,
  zeroOrMore([queryDelimiter, queryKeyValuePair]),
]);

export const urlQueryFinder = buildRegExp(urlQuery, {
  ignoreCase: false,
  global: true,
});

export const urlQueryValidator = buildRegExp([startOfString, urlQuery, endOfString], {
  ignoreCase: false,
  global: false,
});

//    Fragment:
//      The fragment part of a URL is optional and comes after the query.
//      It is separated from the query by a hash (#).
//      The fragment string consists of a sequence of characters.

const fragmentSeparator = '#';
const fragmentSpecialChars = anyOf(":@%._+~=()/-&!$*;?,'");
const fragmentChars = charClass(lowercase, uppercase, digit, fragmentSpecialChars);

export const urlFragment = regex([fragmentSeparator, oneOrMore(fragmentChars)]);

export const urlFragmentFinder = buildRegExp(urlFragment, {
  ignoreCase: false,
  global: true,
});

export const urlFragmentValidator = buildRegExp([startOfString, urlFragment, endOfString], {
  ignoreCase: false,
  global: false,
});

//
//    These two patterns are needed to disambiguate between "http:/path" and "http://authority/path".
//    "http://" is technically a valid URL: urlScheme = http, urlAuthority = null, urlPath = /
//    By convention, an empty path is considered invalid, if it follows an empty authority.
//
const noAuthority = regex([pathSeparator, negativeLookahead(pathSeparator), urlPath]);
const hasAuthority = regex([authoritySeperator, urlAuthority, optional(urlPath)]);

export const url = buildRegExp([
  urlScheme,
  schemeSeperator,
  choiceOf(noAuthority, hasAuthority),
  optional(urlQuery),
  optional(urlFragment),
]);

/***
 ***  Find URL strings in a text.
 ***/

export const urlFinder = buildRegExp(url, {
  global: true,
});

/***
 ***  Check that given text is a valid URL.
 ***/

export const urlValidator = buildRegExp([startOfString, url, endOfString]);
