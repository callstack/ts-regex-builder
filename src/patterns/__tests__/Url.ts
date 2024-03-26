//import { urlFinder, urlValidator } from '..';
import {
  urlAuthorityFinder,
  urlAuthorityValidator,
  urlHostFinder,
  urlHostValidator,
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

test('urlHostValidator', () => {
  expect(urlHostValidator).toMatchString('www.google.com');
});

test('urlHostFinder', () => {
  expect(urlHostFinder).toMatchString('www.google.com');
});

test('urlAuthorityFinder', () => {
  expect(urlAuthorityFinder).toMatchString('abba@a');
});
