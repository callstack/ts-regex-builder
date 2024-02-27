import { buildRegExp } from '../builders';
import { anyOf, digit, endOfString, startOfString, zeroOrMore } from '../index';
import { any, charRange } from '../constructs/character-class';
import { lookahead } from '../constructs/lookahead';

//^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$

//
// The password policy is as follows:
//  - At least one uppercase letter
//  - At least one lowercase letter
//  - At least one digit
//  - At least one special character
//  - At least 8 characters long
//
const specialChars = '$@*&!#%?+-_';
const atLeastOneUppercase = lookahead([zeroOrMore(any), charRange('A', 'Z')]);
const atLeastOneLowercase = lookahead([zeroOrMore(any), charRange('a', 'z')]);
const atLeastOneDigit = lookahead([zeroOrMore(any), digit]);
const atLeastOneSpecialChar = lookahead([zeroOrMore(any), anyOf(specialChars)]);
const atLeast8Chars = /.{8,}/;

test('Example: Validating passwords', () => {
  const validPassword = buildRegExp([
    startOfString,
    atLeastOneUppercase,
    atLeastOneLowercase,
    atLeastOneDigit,
    atLeastOneSpecialChar,
    atLeast8Chars,
    endOfString,
  ]);

  expect(validPassword).toMatchString('Aaaaa$aaaaaaa1');
  expect(validPassword).not.toMatchString('aaaaaaaaaaa');
  expect(validPassword).toMatchString('9aaa#aaaaA');
  expect(validPassword).not.toMatchString('Aa');
  expect(validPassword).toMatchString('Aa$123456');
  expect(validPassword).not.toMatchString('Abba');
  expect(validPassword).not.toMatchString('#password');
  expect(validPassword).toMatchString('#passworD666');
  expect(validPassword).not.toMatchString('Aa%1234');
  // expect(validPassword).toEqualRegex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/g);
});
