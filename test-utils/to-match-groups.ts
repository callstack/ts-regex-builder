import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';

export function toMatchGroups(
  this: jest.MatcherContext,
  received: RegExp | RegexNode | RegexNode[],
  expectedString: string,
  expectedGroups: string[]
) {
  const receivedRegex = received instanceof RegExp ? received : buildRegex(received);

  const options = {
    isNot: this.isNot,
  };

  const matchResult = expectedString.match(receivedRegex);
  const actual = matchResult ? [...matchResult] : null;

  return {
    pass: this.equals(actual, expectedGroups),
    message: () =>
      this.utils.matcherHint('toMatchGroups', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expectedGroups)}\n` +
      `Received: ${this.utils.printReceived(actual)}`,
  };
}

expect.extend({ toMatchGroups });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchGroups(input: string, expected: string[]): R;
    }
  }
}
