import { buildRegex, capture, characterRange, choiceOf, digit, endOfString, repeat, startOfString } from '../index';

test('example: IPv4 address validator', () => {
  const octet = choiceOf(
    [digit],
    [characterRange('1', '9'), digit],
    ['1', repeat({ count: 2 }, digit)],
    ['2', characterRange('0', '4'), digit],
    ['25', characterRange('0', '5')]
  );

  const regex = buildRegex([
    startOfString,
    capture(octet),
    '.',
    capture(octet),
    '.',
    capture(octet),
    '.',
    capture(octet),
    endOfString,
  ]);

  expect(regex).toMatchGroups('0.0.0.0', ['0.0.0.0', '0', '0', '0', '0']);
  expect(regex).toMatchGroups('1.99.100.249', ['1.99.100.249', '1', '99', '100', '249']);
  expect(regex).toMatchGroups('255.255.255.255', ['255.255.255.255', '255', '255', '255', '255']);
  expect(regex).toMatchGroups('123.45.67.89', ['123.45.67.89', '123', '45', '67', '89']);

  expect(regex.test('0.0.0.')).toBe(false);
  expect(regex.test('0.0.0.0.')).toBe(false);
  expect(regex.test('0.-1.0.0')).toBe(false);
  expect(regex.test('0.1000.0.0')).toBe(false);
  expect(regex.test('0.0.300.0')).toBe(false);
  expect(regex.test('255.255.255.256')).toBe(false);

  expect(regex.source).toEqual(
    '^(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])$'
  );
});
