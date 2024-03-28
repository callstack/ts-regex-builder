//
//  A Regular Expression to validate ipv4 and ipv6 addresses.
//

//
//  ipv4 Address
//  Format:  xxx.xxx.xxx.xxx e.g.(172.16.254.1)
//  Source (IP V4): https://datatracker.ietf.org/doc/html/rfc791
//

import { buildRegExp } from '../builders';
import { endOfString, startOfString } from '../constructs/anchors';
import { charRange } from '../constructs/character-class';
import { choiceOf } from '../constructs/choice-of';
import { repeat } from '../constructs/repeat';
import { capture } from '../constructs/capture';
import { optional } from '../constructs/quantifiers';
import { regex } from '../constructs/regex';

import { hexDigit } from './shared';

export const ipv6Group = repeat(hexDigit, { min: 1, max: 4, greedy: false });
export const ipv6GroupValidator = buildRegExp([startOfString, ipv6Group, endOfString]);
const ipv4Seperator = '.';
const ipv6Seperator = ':';

export const ipDigit = choiceOf(
  regex(['2', '5', charRange('0', '5')]),
  regex(['2', charRange('0', '4'), charRange('0', '9')]),
  regex([charRange('0', '1'), charRange('0', '9'), charRange('0', '9')]),
  regex([charRange('0', '9'), charRange('0', '9')]),
  regex([charRange('0', '9')]),
);

export const ipv4DigitValidator = buildRegExp([startOfString, regex(ipDigit), endOfString]);

export const ipv4Address = regex([
  ipDigit,
  ipv4Seperator,
  ipDigit,
  ipv4Seperator,
  ipDigit,
  ipv4Seperator,
  ipDigit,
]);

export const ipv4Finder = buildRegExp([capture(ipv4Address)], {
  ignoreCase: true,
  global: true,
});

export const ipv4Validator = buildRegExp([startOfString, capture(ipv4Address), endOfString], {
  ignoreCase: true,
});

/***
 *** ipv6 Address
 *** Source: https://www.rfc-editor.org/rfc/rfc4291.html
 ***
 *** Form 1:
 ***    ABCD:EF01:2345:6789:ABCD:EF01:2345:6789
 ***    2001:DB8:0:0:8:800:200C:417A (collapsed leading zeros)
 ***
 *** Form 2:
 ***    The following valid addresses:
 ***      2001:DB8:0:0:8:800:200C:417A   a unicast address
 ***      FF01:0:0:0:0:0:0:101           a multicast address
 ***      0:0:0:0:0:0:0:1                the loopback address
 ***      0:0:0:0:0:0:0:0                the unspecified address
 ***
 ***    Can be represented as the following collapsed valid addresses:
 ***      2001:DB8::8:800:200C:417A      a unicast address
 ***      FF01::101                      a multicast address
 ***      ::1                            the loopback address
 ***      ::                             the unspecified address
 ***/

export const ipv6Address = regex([
  optional(ipv6Group),
  ipv6Seperator,
  optional(ipv6Group),
  ipv6Seperator,
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
  optional(ipv6Seperator),
  optional(ipv6Group),
]);

export const ipv6Finder = buildRegExp([capture(ipv6Address)], {
  ignoreCase: true,
  global: true,
});

export const ipv6Validator = buildRegExp([startOfString, capture(ipv6Address), endOfString], {
  ignoreCase: true,
});
