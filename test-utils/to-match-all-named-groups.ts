import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toMatchAllNamedGroups(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  inputText: string,
  expectedGroups: Array<Record<string, string>>,
) {
  const receivedRegex = wrapRegExp(received);
  const matchResult = inputText.matchAll(receivedRegex);
  const receivedGroups = matchResult ? [...matchResult].map((r) => r.groups) : null;
  const options = {
    isNot: this.isNot,
  };

  return {
    pass: this.equals(receivedGroups, expectedGroups),
    message: () => `
      ${this.utils.matcherHint('toMatchGroups', undefined, undefined, options)}\n\n
      Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expectedGroups)}\n
      Received: ${this.utils.printReceived(receivedGroups)}`,
  };
}

expect.extend({ toMatchAllNamedGroups });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchAllNamedGroups(inputText: string, expectedGroups: Array<Record<string, string>>): R;
    }
  }
}
