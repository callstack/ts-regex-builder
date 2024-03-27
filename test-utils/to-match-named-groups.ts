import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toMatchNamedGroups(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  inputText: string,
  expectedGroups: Record<string, string>,
) {
  const receivedRegex = wrapRegExp(received);
  const matchResult = inputText.match(receivedRegex);
  const receivedGroups = matchResult ? matchResult.groups : null;
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

expect.extend({ toMatchNamedGroups });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchNamedGroups(inputText: string, expectedGroups: Record<string, string>): R;
    }
  }
}
