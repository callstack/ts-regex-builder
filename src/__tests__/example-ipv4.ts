import { charRange, choiceOf, digit, endOfString, regex, repeat, startOfString } from '..';

test('example: IPv4 address validator', () => {
  const octet = choiceOf(
    [digit],
    [charRange('1', '9'), digit],
    ['1', repeat(digit, 2)],
    ['2', charRange('0', '4'), digit],
    ['25', charRange('0', '5')],
  );

  const ipv4Validator = regex([
    startOfString, // prettier break-line
    repeat([octet, '.'], 3),
    octet,
    endOfString,
  ]).build();

  expect(ipv4Validator).toMatchString('0.0.0.0');
  expect(ipv4Validator).toMatchString('192.168.0.1');
  expect(ipv4Validator).toMatchString('1.99.100.249');
  expect(ipv4Validator).toMatchString('255.255.255.255');
  expect(ipv4Validator).toMatchString('123.45.67.89');

  expect(ipv4Validator).not.toMatchString('0.0.0.');
  expect(ipv4Validator).not.toMatchString('0.0.0.0.');
  expect(ipv4Validator).not.toMatchString('0.-1.0.0');
  expect(ipv4Validator).not.toMatchString('0.1000.0.0');
  expect(ipv4Validator).not.toMatchString('0.0.300.0');
  expect(ipv4Validator).not.toMatchString('255.255.255.256');

  expect(ipv4Validator).toEqualRegex(
    /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  );
});
