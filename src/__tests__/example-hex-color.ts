import {
  buildRegExp,
  charClass,
  charRange,
  choiceOf,
  digit,
  endOfString,
  optional,
  repeat,
  startOfString,
} from '..';

test('example: hex color validation', () => {
  const hexDigit = charClass(digit, charRange('a', 'f'));

  const regex = buildRegExp(
    [
      startOfString,
      optional('#'),
      choiceOf(
        repeat(hexDigit, 6), // #rrggbb
        repeat(hexDigit, 3), // #rgb
      ),
      endOfString,
    ],
    { ignoreCase: true },
  );

  expect(regex).toMatchString('#ffffff');
  expect(regex).toMatchString('ffffff');
  expect(regex).toMatchString('#eee');
  expect(regex).toMatchString('bbb');
  expect(regex).toMatchString('#000');
  expect(regex).toMatchString('#123456');
  expect(regex).toMatchString('123456');
  expect(regex).toMatchString('#123');
  expect(regex).toMatchString('123');

  expect(regex).not.toMatchString('#1');
  expect(regex).not.toMatchString('#12');
  expect(regex).not.toMatchString('#1234');
  expect(regex).not.toMatchString('#12345');
  expect(regex).not.toMatchString('#1234567');

  expect(regex).toEqualRegex(/^#?(?:[\da-f]{6}|[\da-f]{3})$/i);
});
