import {
  urlAuthorityFinder,
  urlAuthorityValidator,
  urlHostFinder,
  urlHostValidator,
  urlPathValidator,
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
  expect(urlHostValidator).toMatchString('localhost');
});

test('urlHostFinder', () => {
  expect(urlHostFinder).toMatchString('www.google.com');
});

test('urlAuthorityFinder', () => {
  expect(urlAuthorityFinder).toMatchString('abba@a');
});

let longPath100 = '/a';
for (let i = 0; i < 100; i++) {
  longPath100 += '/a';
}

let longPath256 = '/a';
for (let i = 0; i < 256; i++) {
  longPath256 += '/a';
}

test('urlPathValidator', () => {
  expect(urlPathValidator).toMatchString('/a');
  expect(urlPathValidator).toMatchString('/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a');
  expect(urlPathValidator).not.toMatchString('/a/');
  expect(urlPathValidator).not.toMatchString('/a/a/a/a/a/a/');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).not.toMatchString('a');
  expect(urlPathValidator).not.toMatchString('/');
  expect(urlPathValidator).not.toMatchString('//');
  expect(urlPathValidator).not.toMatchString('a/');
  expect(urlPathValidator).not.toMatchString(
    '/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  );
  expect(urlPathValidator).toMatchString(longPath100);
  expect(urlPathValidator).not.toMatchString(longPath256);
});
