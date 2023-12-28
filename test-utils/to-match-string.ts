import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';

export function toMatchString(
  this: jest.MatcherContext,
  received: RegExp | RegexNode | RegexNode[],
  expected: string
) {
  const receivedRegex = received instanceof RegExp ? received : buildRegex(received);
  const options = {
    isNot: this.isNot,
  };

  const matchResult = expected.match(receivedRegex);

  return {
    pass: matchResult !== null,
    message: () =>
      this.utils.matcherHint('toMatchGroups', undefined, undefined, options) +
      '\n\n' +
      `Expected string: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expected)}\n` +
      `Received pattern: ${this.utils.printReceived(receivedRegex.source)}`,
  };
}

expect.extend({ toMatchString });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchString(expected: string): R;
    }
  }
}
