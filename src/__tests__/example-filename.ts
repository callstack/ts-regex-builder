import { choiceOf, endOfString, negativeLookbehind, oneOrMore, regex } from '..';

const isRejectedFileExtension = negativeLookbehind(choiceOf('js', 'css', 'html'));

test('example: filename validator', () => {
  const filenameRegex = regex([
    oneOrMore(/[A-Za-z0-9_]/),
    isRejectedFileExtension,
    endOfString,
  ]).build();

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
