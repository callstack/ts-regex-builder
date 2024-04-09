import { buildRegExp, choiceOf, endOfString, negativeLookbehind, oneOrMore } from '../index';

const isRejectedFileExtension = negativeLookbehind(choiceOf('js', 'css', 'html'));

test('example: filename validator', () => {
  const filenameRegex = buildRegExp([
    oneOrMore(/[A-Za-z0-9_]/),
    isRejectedFileExtension,
    endOfString,
  ]);

  expect(filenameRegex).toMatchString('index.ts', { exactString: false });
  expect(filenameRegex).toMatchString('index.tsx', { exactString: false });
  expect(filenameRegex).toMatchString('ind/ex.ts', { exactString: false });
  expect(filenameRegex).not.toMatchString('index.js', { exactString: false });
  expect(filenameRegex).not.toMatchString('index.html', { exactString: false });
  expect(filenameRegex).not.toMatchString('index.css', { exactString: false });
  expect(filenameRegex).not.toMatchString('./index.js', { exactString: false });
  expect(filenameRegex).not.toMatchString('./index.html', { exactString: false });
  expect(filenameRegex).not.toMatchString('./index.css', { exactString: false });
});
