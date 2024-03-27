//import { urlFinder, urlValidator } from '..';
import {
  ipV4DigitValidator,
  urlAuthorityFinder,
  urlAuthorityValidator,
  urlHostFinder,
  urlHostValidator,
  urlIpv4Validator,
  urlSchemeFinder,
  urlSchemeValidator,
} from '../URL';

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
});

test('urlIpv4Validator', () => {
  expect(urlIpv4Validator).toMatchString('255.255.255.255');
});

test('urlHostValidator', () => {
  expect(urlHostValidator).toMatchString('www.google.com');
  expect(urlHostValidator).toMatchString('ftp.data.com.');
});

test('urlHostFinder', () => {
  expect(urlHostFinder).toMatchString('www.google.com');
});

test('urlAuthorityFinder', () => {
  expect(urlAuthorityFinder).toMatchString('abba@a');
});
