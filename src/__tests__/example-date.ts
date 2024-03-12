import { buildRegExp, digit, endOfString, namedCapture, repeat, startOfString } from '..';

// Example: dateRegex
const dateRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/i;
const yearRegex = namedCapture(repeat(digit, 4), 'year');
const monthRegex = namedCapture(repeat(digit, 2), 'month');
const dayRegex = namedCapture(repeat(digit, 2), 'day');
const regex = buildRegExp([startOfString, yearRegex, '-', monthRegex, '-', dayRegex, endOfString], {
  ignoreCase: true,
});

test('dateRegex', () => {
  expect(dateRegex).toEqual(regex);
});

test('dateRegex matching', () => {
  expect(dateRegex).toMatchGroups('2021-08-24', ['2021-08-24', '2021', '08', '24']);
});
