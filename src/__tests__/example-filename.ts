import { buildRegExp, choiceOf, endOfString, negativeLookbehind, oneOrMore } from '../index';

const isRejectedFileExtension = negativeLookbehind(choiceOf('js', 'css', 'html'));

test('example: filename validator', () => {
  const filenameRegex = buildRegExp([
    oneOrMore(/[A-Za-z0-9_]/),
    isRejectedFileExtension,
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
