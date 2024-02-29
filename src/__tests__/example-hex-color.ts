import {
  charClass,
  charRange,
  choiceOf,
  digit,
  endOfString,
  optional,
  regex,
  repeat,
  startOfString,
} from '..';

test('example: hex color validation', () => {
  const hexDigit = charClass(digit, charRange('a', 'f'));

  const hexColorValidator = regex([
    startOfString,
    optional('#'),
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
    endOfString,
  ]).build({ ignoreCase: true });

  expect(hexColorValidator).toMatchString('#ffffff');
  expect(hexColorValidator).toMatchString('ffffff');
  expect(hexColorValidator).toMatchString('#eee');
  expect(hexColorValidator).toMatchString('bbb');
  expect(hexColorValidator).toMatchString('#000');
  expect(hexColorValidator).toMatchString('#123456');
  expect(hexColorValidator).toMatchString('123456');
  expect(hexColorValidator).toMatchString('#123');
  expect(hexColorValidator).toMatchString('123');

  expect(hexColorValidator).not.toMatchString('#1');
  expect(hexColorValidator).not.toMatchString('#12');
  expect(hexColorValidator).not.toMatchString('#1234');
  expect(hexColorValidator).not.toMatchString('#12345');
  expect(hexColorValidator).not.toMatchString('#1234567');

  expect(hexColorValidator).toEqualRegex(/^#?(?:[a-f\d]{6}|[a-f\d]{3})$/i);
});
