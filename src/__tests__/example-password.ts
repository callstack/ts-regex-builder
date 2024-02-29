import { any, endOfString, lookahead, regex, startOfString, zeroOrMore } from '../index';

//^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$

//
// The password policy is as follows:
//  - At least one uppercase letter
//  - At least one lowercase letter
//  - At least one digit
//  - At least one special character
//  - At least 8 characters long

const atLeastOneUppercase = lookahead([zeroOrMore(any), /[A-Z]/]);
const atLeastOneLowercase = lookahead([zeroOrMore(any), /[a-z]/]);
const atLeastOneDigit = lookahead([zeroOrMore(any), /[0-9]/]);
const atLeastOneSpecialChar = lookahead([zeroOrMore(any), /[^A-Za-z0-9\s]/]);
const atLeastEightChars = /.{8,}/;

test('Example: Validating passwords', () => {
  const passwordValidator = regex([
    startOfString,
    atLeastOneUppercase,
    atLeastOneLowercase,
    atLeastOneDigit,
    atLeastOneSpecialChar,
    atLeastEightChars,
    endOfString,
  ]).build();

  expect(passwordValidator).toMatchString('Aaaaa$aaaaaaa1');
  expect(passwordValidator).not.toMatchString('aaaaaaaaaaa');
  expect(passwordValidator).toMatchString('9aaa#aaaaA');
  expect(passwordValidator).not.toMatchString('Aa');
  expect(passwordValidator).toMatchString('Aa$123456');
  expect(passwordValidator).not.toMatchString('Abba');
  expect(passwordValidator).not.toMatchString('#password');
  expect(passwordValidator).toMatchString('#passworD666');
  expect(passwordValidator).not.toMatchString('Aa%1234');

  expect(passwordValidator).toEqualRegex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s])(?:.{8,})$/,
  );
});
