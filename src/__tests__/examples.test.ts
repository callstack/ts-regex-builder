import {
  buildRegex,
  charRange,
  choiceOf,
  digit,
  endOfString,
  repeat,
  startOfString,
} from '../index';

test('example: IPv4 address validator', () => {
  const octet = choiceOf(
    [digit],
    [charRange('1', '9'), digit],
    ['1', repeat(digit, { count: 2 })],
    ['2', charRange('0', '4'), digit],
    ['25', charRange('0', '5')]
  );

  const regex = buildRegex([
    startOfString, //
    repeat([octet, '.'], { count: 3 }),
    octet,
    endOfString,
  ]);

  expect(regex).toMatchString('0.0.0.0');
  expect(regex).toMatchString('192.168.0.1');
  expect(regex).toMatchString('1.99.100.249');
  expect(regex).toMatchString('255.255.255.255');
  expect(regex).toMatchString('123.45.67.89');

  expect(regex).not.toMatchString('0.0.0.');
  expect(regex).not.toMatchString('0.0.0.0.');
  expect(regex).not.toMatchString('0.-1.0.0');
  expect(regex).not.toMatchString('0.1000.0.0');
  expect(regex).not.toMatchString('0.0.300.0');
  expect(regex).not.toMatchString('255.255.255.256');

  expect(regex).toHavePattern(
    /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
  );
});
