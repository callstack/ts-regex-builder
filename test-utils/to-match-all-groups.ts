import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toMatchAllGroups(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expectedString: string,
  expectedGroups: string[],
) {
  const receivedRegex = wrapRegExp(received);
  const receivedGroups = toNestedArray(expectedString.matchAll(receivedRegex));
  const options = {
    isNot: this.isNot,
  };

  return {
    pass: this.equals(receivedGroups, expectedGroups),
    message: () =>
      this.utils.matcherHint('toMatchGroups', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expectedGroups)}\n` +
      `Received: ${this.utils.printReceived(receivedGroups)}`,
  };
}

expect.extend({ toMatchAllGroups });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchAllGroups(input: string, expected: string[][]): R;
    }
  }
}

function toNestedArray(iterator: IterableIterator<RegExpMatchArray>) {
  const result: string[][] = [];

  for (const match of iterator) {
    result.push([...match]);
  }

  return result;
}
