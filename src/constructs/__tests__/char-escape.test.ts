import { any, digit, nonDigit, nonWhitespace, nonWord, whitespace, word } from '../..';

test('`any` character class', () => {
  expect(any).toEqualRegex(/./);
  expect(['x', any]).toEqualRegex(/x./);
  expect(['x', any, 'x']).toEqualRegex(/x.x/);
});

test('`digit` character class', () => {
  expect(digit).toEqualRegex(/\d/);
  expect(['x', digit]).toEqualRegex(/x\d/);
  expect(['x', digit, 'x']).toEqualRegex(/x\dx/);
  expect(digit).toMatchString('1');
  expect(digit).not.toMatchString('A');
});

test('`nonDigit` character class', () => {
  expect(nonDigit).toEqualRegex(/\D/);
  expect(['x', nonDigit]).toEqualRegex(/x\D/);
  expect(['x', nonDigit, 'x']).toEqualRegex(/x\Dx/);
  expect(nonDigit).not.toMatchString('1');
  expect(nonDigit).toMatchString('A');
});

test('`word` character class', () => {
  expect(word).toEqualRegex(/\w/);
  expect(['x', word]).toEqualRegex(/x\w/);
  expect(['x', word, 'x']).toEqualRegex(/x\wx/);
  expect(word).toMatchString('A');
  expect(word).toMatchString('1');
  expect(word).not.toMatchString('$');
});

test('`nonWord` character class', () => {
  expect(nonWord).toEqualRegex(/\W/);
  expect(['x', nonWord]).toEqualRegex(/x\W/);
  expect(['x', nonWord, 'x']).toEqualRegex(/x\Wx/);
  expect(nonWord).not.toMatchString('A');
  expect(nonWord).not.toMatchString('1');
  expect(nonWord).toMatchString('$');
});

test('`whitespace` character class', () => {
  expect(whitespace).toEqualRegex(/\s/);
  expect(['x', whitespace]).toEqualRegex(/x\s/);
  expect(['x', whitespace, 'x']).toEqualRegex(/x\sx/);
  expect(whitespace).toMatchString(' ');
  expect(whitespace).toMatchString('\t');
  expect(whitespace).not.toMatchString('A');
  expect(whitespace).not.toMatchString('1');
});

test('`nonWhitespace` character class', () => {
  expect(nonWhitespace).toEqualRegex(/\S/);
  expect(['x', nonWhitespace]).toEqualRegex(/x\S/);
  expect(['x', nonWhitespace, 'x']).toEqualRegex(/x\Sx/);
  expect(nonWhitespace).not.toMatchString(' ');
  expect(nonWhitespace).not.toMatchString('\t');
  expect(nonWhitespace).toMatchString('A');
  expect(nonWhitespace).toMatchString('1');
});

test('example: negated character classes', () => {
  expect(nonDigit).toEqualRegex(/\D/);
  expect(nonWord).toEqualRegex(/\W/);
  expect(nonWhitespace).toEqualRegex(/\S/);

  expect(nonDigit).toMatchString('A');
  expect(nonDigit).not.toMatchString('1');
  expect(nonDigit).toMatchString(' ');
  expect(nonDigit).toMatchString('#');

  expect(nonWord).not.toMatchString('A');
  expect(nonWord).not.toMatchString('1');
  expect(nonWord).toMatchString(' ');
  expect(nonWord).toMatchString('#');

  expect(nonWhitespace).toMatchString('A');
  expect(nonWhitespace).toMatchString('1');
  expect(nonWhitespace).not.toMatchString(' ');
  expect(nonWhitespace).toMatchString('#');
});
