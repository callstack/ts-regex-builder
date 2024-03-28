import {
  hexDigit,
  ipV4DigitValidator,
  ipV6GroupValidator,
  urlAuthorityFinder,
  urlAuthorityValidator,
  urlHostFinder,
  urlHostValidator,
  urlIpv4Validator,
  urlIpv6Validator,
  urlSchemeFinder,
  urlSchemeValidator,
} from '../url';

test('urlSchemeValidator', () => {
  expect(urlSchemeValidator).toMatchString('ftp:');
  expect(urlSchemeValidator).toMatchString('https:');
  expect(urlSchemeValidator).not.toMatchString('http');
  expect(urlSchemeValidator).not.toMatchString('https');
  expect(urlSchemeValidator).not.toMatchString('ht:');
  expect(urlSchemeValidator).not.toMatchString('httpsftpmailtoirc:');
  expect(urlSchemeValidator).not.toMatchString('httpsftpmailtoirc');
});

test('urlSchemeFinder', () => {
  expect(urlSchemeFinder).toMatchAllGroups('The best place to search is http:', [
    ['http:', 'http:'],
  ]);
});

test('urlAuthorityValidator', () => {
  expect(urlAuthorityValidator).toMatchString('abba@a');
  expect(urlAuthorityValidator).not.toMatchString('abba@');
  expect(urlAuthorityValidator).not.toMatchString('@');
  expect(urlAuthorityValidator).not.toMatchString('@aa.aa.aa.aa.aa.aa');
  expect(urlAuthorityValidator).toMatchString('aa');
  expect(urlAuthorityValidator).toMatchString('aaa');
  expect(urlAuthorityValidator).toMatchString('aa.aa');
  expect(urlAuthorityValidator).toMatchString('aa.aa.aa');
  expect(urlAuthorityValidator).toMatchString('aa.aa.aa.aa.aa.aa');
  expect(urlAuthorityValidator).toMatchString('abba@aa.aa.aa.aa.aa.aa');
  expect(urlAuthorityValidator).toMatchString('aaaa.aaaa');
  expect(urlAuthorityValidator).toMatchString('aaaaaaaaaa');
  expect(urlAuthorityValidator).toMatchString('aaaa.aaaaaaa');
  expect(urlAuthorityValidator).toMatchString('abba@aaaa.aaaa');
  expect(urlAuthorityValidator).toMatchString('abba@aaaaaaaaaa');
  expect(urlAuthorityValidator).toMatchString('abba@aaaa.aaaaaaa');
});

test('ipDigit', () => {
  expect(ipV4DigitValidator).toMatchString('255');
  expect(ipV4DigitValidator).not.toMatchString('256');
  expect(ipV4DigitValidator).toMatchString('25');
  expect(ipV4DigitValidator).not.toMatchString('25.5');
  expect(ipV4DigitValidator).toMatchString('249');
  expect(ipV4DigitValidator).toMatchString('100');
  expect(ipV4DigitValidator).toMatchString('199');
  expect(ipV4DigitValidator).not.toMatchString('1000');
  expect(ipV4DigitValidator).not.toMatchString('100.');
  expect(ipV4DigitValidator).toMatchString('000');
  expect(ipV4DigitValidator).toMatchString('00');
  expect(ipV4DigitValidator).toMatchString('0');
  expect(ipV4DigitValidator).not.toMatchString('000.0');
  expect(ipV4DigitValidator).not.toMatchString('00.0');
  expect(ipV4DigitValidator).not.toMatchString('0.0');
});

test('hexDigit', () => {
  expect(hexDigit).toMatchString('0');
  expect(hexDigit).toMatchString('1');
  expect(hexDigit).toMatchString('2');
  expect(hexDigit).toMatchString('3');
  expect(hexDigit).toMatchString('4');
  expect(hexDigit).toMatchString('5');
  expect(hexDigit).toMatchString('6');
  expect(hexDigit).toMatchString('7');
  expect(hexDigit).toMatchString('8');
  expect(hexDigit).toMatchString('9');
  expect(hexDigit).toMatchString('a');
  expect(hexDigit).toMatchString('b');
  expect(hexDigit).toMatchString('c');
  expect(hexDigit).toMatchString('d');
  expect(hexDigit).toMatchString('e');
  expect(hexDigit).toMatchString('f');
  expect(hexDigit).not.toMatchString('g');
  expect(hexDigit).not.toMatchString('h');
  expect(hexDigit).toMatchString('A');
  expect(hexDigit).toMatchString('B');
  expect(hexDigit).toMatchString('C');
  expect(hexDigit).toMatchString('D');
  expect(hexDigit).toMatchString('E');
  expect(hexDigit).toMatchString('F');
  expect(hexDigit).not.toMatchString('G');
  expect(hexDigit).not.toMatchString('H');
});

test('ipV6GroupValidator', () => {
  expect(ipV6GroupValidator).toMatchString('0');
  expect(ipV6GroupValidator).toMatchString('00');
  expect(ipV6GroupValidator).toMatchString('000');
  expect(ipV6GroupValidator).toMatchString('0000');
  expect(ipV6GroupValidator).not.toMatchString('00000');
  expect(ipV6GroupValidator).toMatchString('1');
  expect(ipV6GroupValidator).toMatchString('01');
  expect(ipV6GroupValidator).toMatchString('001');
  expect(ipV6GroupValidator).toMatchString('0001');
  expect(ipV6GroupValidator).not.toMatchString('00001');
  expect(ipV6GroupValidator).toMatchString('f');
  expect(ipV6GroupValidator).toMatchString('ff');
  expect(ipV6GroupValidator).toMatchString('fff');
  expect(ipV6GroupValidator).toMatchString('ffff');
  expect(ipV6GroupValidator).not.toMatchString('fffff');
  expect(ipV6GroupValidator).toMatchString('a');
  expect(ipV6GroupValidator).toMatchString('aa');
  expect(ipV6GroupValidator).toMatchString('aaa');
  expect(ipV6GroupValidator).toMatchString('aaaa');
  expect(ipV6GroupValidator).not.toMatchString('aaaaa');
  expect(ipV6GroupValidator).toMatchString('A');
  expect(ipV6GroupValidator).toMatchString('AA');
  expect(ipV6GroupValidator).toMatchString('AAA');
  expect(ipV6GroupValidator).toMatchString('AAAA');
  expect(ipV6GroupValidator).not.toMatchString('AAAAA');
  expect(ipV6GroupValidator).toMatchString('b');
  expect(ipV6GroupValidator).toMatchString('bb');
  expect(ipV6GroupValidator).toMatchString('bbb');
  expect(ipV6GroupValidator).toMatchString('bbbb');
  expect(ipV6GroupValidator).not.toMatchString('bbbbb');
  expect(ipV6GroupValidator).toMatchString('B');
  expect(ipV6GroupValidator).toMatchString('BB');
  expect(ipV6GroupValidator).toMatchString('BBB');
  expect(ipV6GroupValidator).toMatchString('BBBB');
  expect(ipV6GroupValidator).not.toMatchString('BBBBB');
  expect(ipV6GroupValidator).not.toMatchString('g');
  expect(ipV6GroupValidator).not.toMatchString('gg');
  expect(ipV6GroupValidator).not.toMatchString('ggg');
  expect(ipV6GroupValidator).not.toMatchString('gggg');
  expect(ipV6GroupValidator).toMatchString('2001');
  expect(ipV6GroupValidator).toMatchString('Db8');
  expect(ipV6GroupValidator).toMatchString('8');
  expect(ipV6GroupValidator).toMatchString('800');
  expect(ipV6GroupValidator).toMatchString('200C');
  expect(ipV6GroupValidator).toMatchString('417A');
});

test('urlIpv4Validator', () => {
  expect(urlIpv4Validator).toMatchString('255.255.255.255');
  expect(urlIpv4Validator).not.toMatchString('255:255:255:255');
  expect(urlIpv4Validator).not.toMatchString('256.256.256.256');
  expect(urlIpv4Validator).not.toMatchString('255.255.255.255.255');
  expect(urlIpv4Validator).not.toMatchString('255.255.255');
  expect(urlIpv4Validator).toMatchString('10.0.0.128');
  expect(urlIpv4Validator).not.toMatchString('10.0.0.128.');
});

test('urlIpv6Validator', () => {
  expect(urlIpv6Validator).toMatchString('2001::');
  expect(urlIpv6Validator).toMatchString('2001:DB8:');
  expect(urlIpv6Validator).toMatchString('2001:DB8:0:');
  expect(urlIpv6Validator).toMatchString('2001:DB8:0:0:');
  expect(urlIpv6Validator).toMatchString('2001:DB8:0:0:8:');
  expect(urlIpv6Validator).toMatchString('2001:DB8:0:0:8:800:');
  expect(urlIpv6Validator).toMatchString('2001:DB8:0:0:8:800:200C:');
  expect(urlIpv6Validator).toMatchString('2001:DB8::8:800:200C:417A');
  expect(urlIpv6Validator).toMatchString('FF01:0:0:0:0:0:0:101');
  expect(urlIpv6Validator).toMatchString('FF01::101');
  expect(urlIpv6Validator).not.toMatchString('255.255.255.255.255.255');
  expect(urlIpv6Validator).not.toMatchString('255.255.255');
  expect(urlIpv6Validator).toMatchString('0:0:0:0:0:0:0:1');
  expect(urlIpv6Validator).toMatchString('0:0:0:0:0:0:0:1');
  expect(urlIpv6Validator).toMatchString('::1');
  expect(urlIpv6Validator).toMatchString('::');
});

test('urlHostValidator', () => {
  expect(urlHostValidator).toMatchString('www.google.com');
  expect(urlHostValidator).toMatchString('www.google');
  expect(urlHostValidator).toMatchString('google.com');
  expect(urlHostValidator).not.toMatchString('ftp.data.com.');
  expect(urlHostValidator).toMatchString('a');
  expect(urlHostValidator).toMatchString('a.a');
  expect(urlHostValidator).toMatchString('a.a.a');
  expect(urlHostValidator).toMatchString('a.a.a.a.a.a');
  expect(urlHostValidator).not.toMatchString('a.');
  expect(urlHostValidator).not.toMatchString('a.a.a.a.a.a.');
});

test('urlHostFinder', () => {
  expect(urlHostFinder).toMatchString('www.google.com');
});

test('urlAuthorityFinder', () => {
  expect(urlAuthorityFinder).toMatchString('abba@a');
});
