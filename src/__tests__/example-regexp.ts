import { choiceOf, endOfString, regex, repeat, startOfString } from '..';

test('example: mixing with RegExp literals (IPv4 address validator)', () => {
  const octet = choiceOf(
    /[0-9]/, // 0-9
    /[1-9][0-9]/, // 10-99
    /1[0-9][0-9]/, // 100-199
    /2[0-4][0-9]/, // 200-249
    /25[0-5]/, // 250-255
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
    /^(?:(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,
  );
});
