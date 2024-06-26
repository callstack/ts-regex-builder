import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toMatchGroups(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  inputText: string,
  expectedGroups: string[],
) {
  const receivedRegex = wrapRegExp(received);
  const matchResult = inputText.match(receivedRegex);
  const receivedGroups = matchResult ? [...matchResult] : null;
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

expect.extend({ toMatchGroups });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchGroups(inputText: string, expectedGroups: string[]): R;
    }
  }
}
