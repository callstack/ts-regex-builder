import { buildRegExp } from '../builders';
import { charClass, charRange, choiceOf, endOfString, oneOrMore } from '../index';
import { negativeLookbehind } from '../constructs/negative-lookbehind';

const skipFileExtension = choiceOf('js', 'css', 'html');
const isAllowedFileExtension = negativeLookbehind(skipFileExtension);

test('example: extracting currency values', () => {
  const filenameRegex = buildRegExp([
    oneOrMore(charClass(charRange('a', 'z'), charRange('A', 'Z'), charRange('0', '9'))),
    isAllowedFileExtension,
    endOfString,
  ]);

  expect(filenameRegex).toMatchString('index.ts');
  expect(filenameRegex).toMatchString('index.tsx');
  expect(filenameRegex).toMatchString('ind/ex.ts');
  expect(filenameRegex).not.toMatchString('index.js');
  expect(filenameRegex).not.toMatchString('index.html');
  expect(filenameRegex).not.toMatchString('index.css');
  expect(filenameRegex).not.toMatchString('./index.js');
  expect(filenameRegex).not.toMatchString('./index.html');
  expect(filenameRegex).not.toMatchString('./index.css');
});
