//import { urlFinder, urlValidator } from '..';
import {
  UrlAuthorityFinder,
  UrlAuthorityValidator,
  UrlHostFinder,
  UrlHostValidator,
  UrlSchemeFinder,
  UrlSchemeValidator,
} from '../URL';

test('urlSchemeValidator', () => {
  expect(UrlSchemeValidator).toMatchString('ftp:');
  expect(UrlSchemeValidator).toMatchString('https:');
  expect(UrlSchemeValidator).not.toMatchString('http');
  expect(UrlSchemeValidator).not.toMatchString('https');
  expect(UrlSchemeValidator).not.toMatchString('ht:');
  expect(UrlSchemeValidator).not.toMatchString('httpsftpmailtoirc:');
});

test('UrlSchemeFinder', () => {
  expect(UrlSchemeFinder).toMatchAllGroups('The best place to search is http:', [
    ['http:', 'http:'],
  ]);
});

test('UrlAuthorityValidator', () => {
  expect(UrlAuthorityValidator).toMatchString('abba@a');
  expect(UrlAuthorityValidator).not.toMatchString('abba@');
  expect(UrlAuthorityValidator).not.toMatchString('@');
  expect(UrlAuthorityValidator).not.toMatchString('@aa.aa.aa.aa.aa.aa');
  expect(UrlAuthorityValidator).toMatchString('aa');
  expect(UrlAuthorityValidator).toMatchString('aaa');
  expect(UrlAuthorityValidator).toMatchString('aa.aa');
  expect(UrlAuthorityValidator).toMatchString('aa.aa.aa');
  expect(UrlAuthorityValidator).toMatchString('aa.aa.aa.aa.aa.aa');
  expect(UrlAuthorityValidator).toMatchString('abba@aa.aa.aa.aa.aa.aa');
  expect(UrlAuthorityValidator).toMatchString('aaaa.aaaa');
  expect(UrlAuthorityValidator).toMatchString('aaaaaaaaaa');
  expect(UrlAuthorityValidator).toMatchString('aaaa.aaaaaaa');
  expect(UrlAuthorityValidator).toMatchString('abba@aaaa.aaaa');
  expect(UrlAuthorityValidator).toMatchString('abba@aaaaaaaaaa');
  expect(UrlAuthorityValidator).toMatchString('abba@aaaa.aaaaaaa');
});

test('UrlHostValidator', () => {
  expect(UrlHostValidator).toMatchString('www.google.com');
});

test('UrlHostFinder', () => {
  expect(UrlHostFinder).toMatchString('www.google.com');
});

test('UrlAuthorityFinder', () => {
  expect(UrlAuthorityFinder).toMatchString('abba@a');
});
