import { hexDigit, lowerCaseHexDigit, upperCaseHexDigit } from '../atoms';

test('lowerCaseHexDigit', () => {
  expect(lowerCaseHexDigit).toMatchString('0');
  expect(lowerCaseHexDigit).toMatchString('1');
  expect(lowerCaseHexDigit).toMatchString('2');
  expect(lowerCaseHexDigit).toMatchString('3');
  expect(lowerCaseHexDigit).toMatchString('4');
  expect(lowerCaseHexDigit).toMatchString('5');
  expect(lowerCaseHexDigit).toMatchString('6');
  expect(lowerCaseHexDigit).toMatchString('7');
  expect(lowerCaseHexDigit).toMatchString('8');
  expect(lowerCaseHexDigit).toMatchString('9');
  expect(lowerCaseHexDigit).toMatchString('a');
  expect(lowerCaseHexDigit).toMatchString('b');
  expect(lowerCaseHexDigit).toMatchString('c');
  expect(lowerCaseHexDigit).toMatchString('d');
  expect(lowerCaseHexDigit).toMatchString('e');
  expect(lowerCaseHexDigit).toMatchString('f');
  expect(lowerCaseHexDigit).not.toMatchString('g');
  expect(lowerCaseHexDigit).not.toMatchString('h');
});

test('upperCaseHexDigit', () => {
  expect(upperCaseHexDigit).toMatchString('0');
  expect(upperCaseHexDigit).toMatchString('1');
  expect(upperCaseHexDigit).toMatchString('2');
  expect(upperCaseHexDigit).toMatchString('3');
  expect(upperCaseHexDigit).toMatchString('4');
  expect(upperCaseHexDigit).toMatchString('5');
  expect(upperCaseHexDigit).toMatchString('6');
  expect(upperCaseHexDigit).toMatchString('7');
  expect(upperCaseHexDigit).toMatchString('8');
  expect(upperCaseHexDigit).toMatchString('9');
  expect(upperCaseHexDigit).toMatchString('A');
  expect(upperCaseHexDigit).toMatchString('B');
  expect(upperCaseHexDigit).toMatchString('C');
  expect(upperCaseHexDigit).toMatchString('D');
  expect(upperCaseHexDigit).toMatchString('E');
  expect(upperCaseHexDigit).toMatchString('F');
  expect(upperCaseHexDigit).not.toMatchString('G');
  expect(upperCaseHexDigit).not.toMatchString('H');
});

test('hexDigit', () => {
  expect(hexDigit).toMatchString('0');
  expect(hexDigit).toMatchString('1');
  expect(hexDigit).toMatchString('2');
  expect(hexDigit).toMatchString('3');
  expect(hexDigit).toMatchString('4');
  expect(hexDigit).toMatchString('5');
  expect(hexDigit).toMatchString('6');
  expect(hexDigit).toMatchString('7');
  expect(hexDigit).toMatchString('8');
  expect(hexDigit).toMatchString('9');
  expect(hexDigit).toMatchString('a');
  expect(hexDigit).toMatchString('b');
  expect(hexDigit).toMatchString('c');
  expect(hexDigit).toMatchString('d');
  expect(hexDigit).toMatchString('e');
  expect(hexDigit).toMatchString('f');
  expect(hexDigit).not.toMatchString('g');
  expect(hexDigit).not.toMatchString('h');
  expect(hexDigit).toMatchString('A');
  expect(hexDigit).toMatchString('B');
  expect(hexDigit).toMatchString('C');
  expect(hexDigit).toMatchString('D');
  expect(hexDigit).toMatchString('E');
  expect(hexDigit).toMatchString('F');
  expect(hexDigit).not.toMatchString('G');
  expect(hexDigit).not.toMatchString('H');
});
