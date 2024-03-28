import { ipv4DigitValidator, ipv4Validator, ipv6GroupValidator } from '..';

test('ipDigit', () => {
  expect(ipv4DigitValidator).toMatchString('255');
  expect(ipv4DigitValidator).not.toMatchString('256');
  expect(ipv4DigitValidator).toMatchString('25');
  expect(ipv4DigitValidator).not.toMatchString('25.5');
  expect(ipv4DigitValidator).toMatchString('249');
  expect(ipv4DigitValidator).toMatchString('100');
  expect(ipv4DigitValidator).toMatchString('199');
  expect(ipv4DigitValidator).not.toMatchString('1000');
  expect(ipv4DigitValidator).not.toMatchString('100.');
  expect(ipv4DigitValidator).toMatchString('000');
  expect(ipv4DigitValidator).toMatchString('00');
  expect(ipv4DigitValidator).toMatchString('0');
  expect(ipv4DigitValidator).not.toMatchString('000.0');
  expect(ipv4DigitValidator).not.toMatchString('00.0');
  expect(ipv4DigitValidator).not.toMatchString('0.0');
});

test('ipv6GroupValidator', () => {
  expect(ipv6GroupValidator).toMatchString('0');
  expect(ipv6GroupValidator).toMatchString('00');
  expect(ipv6GroupValidator).toMatchString('000');
  expect(ipv6GroupValidator).toMatchString('0000');
  expect(ipv6GroupValidator).not.toMatchString('00000');
  expect(ipv6GroupValidator).toMatchString('1');
  expect(ipv6GroupValidator).toMatchString('01');
  expect(ipv6GroupValidator).toMatchString('001');
  expect(ipv6GroupValidator).toMatchString('0001');
  expect(ipv6GroupValidator).not.toMatchString('00001');
  expect(ipv6GroupValidator).toMatchString('f');
  expect(ipv6GroupValidator).toMatchString('ff');
  expect(ipv6GroupValidator).toMatchString('fff');
  expect(ipv6GroupValidator).toMatchString('ffff');
  expect(ipv6GroupValidator).not.toMatchString('fffff');
  expect(ipv6GroupValidator).toMatchString('a');
  expect(ipv6GroupValidator).toMatchString('aa');
  expect(ipv6GroupValidator).toMatchString('aaa');
  expect(ipv6GroupValidator).toMatchString('aaaa');
  expect(ipv6GroupValidator).not.toMatchString('aaaaa');
  expect(ipv6GroupValidator).toMatchString('A');
  expect(ipv6GroupValidator).toMatchString('AA');
  expect(ipv6GroupValidator).toMatchString('AAA');
  expect(ipv6GroupValidator).toMatchString('AAAA');
  expect(ipv6GroupValidator).not.toMatchString('AAAAA');
  expect(ipv6GroupValidator).not.toMatchString('g');
  expect(ipv6GroupValidator).not.toMatchString('gg');
  expect(ipv6GroupValidator).not.toMatchString('ggg');
  expect(ipv6GroupValidator).not.toMatchString('gggg');
  expect(ipv6GroupValidator).toMatchString('2001');
  expect(ipv6GroupValidator).toMatchString('Db8');
  expect(ipv6GroupValidator).toMatchString('8');
  expect(ipv6GroupValidator).toMatchString('800');
  expect(ipv6GroupValidator).toMatchString('200C');
  expect(ipv6GroupValidator).toMatchString('417A');
});

test('ipv4Validator', () => {
  expect(ipv4Validator).toMatchString('255.255.255.255');
  expect(ipv4Validator).not.toMatchString('255:255:255:255');
  expect(ipv4Validator).not.toMatchString('256.256.256.256');
  expect(ipv4Validator).not.toMatchString('255.255.255.255.255');
  expect(ipv4Validator).not.toMatchString('255.255.255');
  expect(ipv4Validator).toMatchString('10.0.0.128');
  expect(ipv4Validator).not.toMatchString('10.0.0.128.');
  expect(ipv4Validator).not.toMatchString('.....');
});
