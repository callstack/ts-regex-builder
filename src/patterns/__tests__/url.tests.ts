import {
  urlAuthorityFinder,
  urlAuthorityValidator,
  urlFragmentValidator,
  urlHost,
  urlHostValidator,
  urlPathValidator,
  urlQueryValidator,
  urlScheme,
  urlSchemeFinder,
  urlSchemeValidator,
  urlValidator,
} from '..';

test('urlScheme', () => {
  expect(urlScheme).not.toMatchString('http');
  expect(urlScheme).not.toMatchString('http://');
  expect(urlScheme).not.toMatchString('http//');
  expect(urlScheme).toMatchString('ftp:', { exactString: false, substring: 'ftp' });
  expect(urlScheme).not.toMatchString('ftp:');
  expect(urlScheme).toMatchString('http:', { exactString: false, substring: 'http' });
  expect(urlScheme).not.toMatchString('http:');
  expect(urlScheme).toMatchString('http://', { exactString: false, substring: 'http' });
  expect(urlScheme).not.toMatchString('http://');
});

test('urlSchemeValidator', () => {
  expect(urlSchemeValidator).not.toMatchString('http');
  expect(urlSchemeValidator).not.toMatchString('http://');
  expect(urlSchemeValidator).not.toMatchString('http//', { exactString: false, substring: 'http' });
  expect(urlSchemeValidator).toMatchString('ftp:');
  expect(urlSchemeValidator).not.toMatchString('http://');
  expect(urlSchemeValidator).not.toMatchString('https');
  expect(urlSchemeValidator).not.toMatchString('http://', {
    exactString: false,
    substring: 'http',
  });
  expect(urlSchemeValidator).not.toMatchString('http://');
  expect(urlSchemeValidator).not.toMatchString('ft');
  expect(urlSchemeValidator).not.toMatchString('httpsftpmailtoirc');
});

test('urlSchemeFinder', () => {
  expect(urlSchemeFinder).toMatchAllGroups(
    'The best way to get data for interactive apps is "http:" and not "ftp:."',
    [['http:'], ['ftp:']],
  );
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
  expect(urlAuthorityValidator).toMatchString('www.example.com');
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

test('urlHost', () => {
  expect(urlHost).toMatchString('www');
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
  expect(urlPathValidator).toMatchString('/a/');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).toMatchString('/a/a/a/a/a/a/a/a/a/a');
  expect(urlPathValidator).not.toMatchString('a');
  expect(urlPathValidator).toMatchString('/');
  expect(urlPathValidator).toMatchString('//');
  expect(urlPathValidator).not.toMatchString('a/');
  expect(urlPathValidator).not.toMatchString(
    '/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  );
  expect(urlPathValidator).toMatchString(longPath100);
  expect(urlPathValidator).not.toMatchString(longPath256);
});

test('urlQueryValidator', () => {
  expect(urlQueryValidator).not.toMatchString('?');
  expect(urlQueryValidator).not.toMatchString('?a');
  expect(urlQueryValidator).not.toMatchString('?a=');
  expect(urlQueryValidator).toMatchString('?a=b');
  expect(urlQueryValidator).toMatchString('?a=b&c=d');
  expect(urlQueryValidator).toMatchString('?a=b&c=d;e=f');
  expect(urlQueryValidator).toMatchString('?a=b;c=d');
  expect(urlQueryValidator).not.toMatchString('?a=b+c=d');
  expect(urlQueryValidator).not.toMatchString('a=b');
  expect(urlQueryValidator).toMatchString('?bar=baz');
  expect(urlQueryValidator).toMatchString('?bar=baz&inga=42');
  expect(urlQueryValidator).not.toMatchString('?bar=baz&inga=42&quux');
  expect(urlQueryValidator).toMatchString('?q=TestURL-encodedstuff');
});

test('urlFragmentValidator', () => {
  expect(urlFragmentValidator).not.toMatchString('#');
  expect(urlFragmentValidator).toMatchString('#a');
  expect(urlFragmentValidator).toMatchString('#bar');
  expect(urlFragmentValidator).toMatchString('#xpointer(//Rube)');
});

const urlShouldMatch = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'http://odf.ws/123',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://142.42.1.1/',
  'http://142.42.1.1:8080/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(o)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://o.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'ftp://foo.bar/baz',
  'http://foo.bar/?q=TestURL-encodedstuff',
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'rdar://1234',
  'ftps://foo.bar/',
  'http://-a.b.co',
  'http://0.0.0.0',
  'http://10.1.1.0',
  'http://10.1.1.255',
  'http://224.1.1.1',
  'http://1.1.1.1.1',
  'http://123.123.123',
  'http://3628126748',
  'http://10.1.1.1',
  'http://10.1.1.254',
];

const urlShouldNotMatch = [
  'www.google.com',
  'google.com',
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http:///a',
  '//',
  '//a',
  '///a',
  '///',
  'foo.com',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
];

test('urlValidator', () => {
  for (const url of urlShouldMatch) {
    expect(url).toMatch(urlValidator);
  }
  for (const url of urlShouldNotMatch) {
    expect(urlValidator).not.toMatchString(url);
  }
});
