import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';

export function toHavePattern(
  this: jest.MatcherContext,
  received: RegExp | RegexNode | RegexNode[],
  expected: RegExp
) {
  let regex;
  if (received instanceof RegExp) {
    regex = received;
  } else {
    regex = buildRegex(received);
  }

  const receivedPattern = regex.source;
  const expectedPattern = expected.source;

  const options = {
    isNot: this.isNot,
  };

  return {
    pass: expectedPattern === receivedPattern,
    message: () =>
      this.utils.matcherHint('toHavePattern', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expectedPattern)}\n` +
      `Received: ${this.utils.printReceived(receivedPattern)}`,
  };
}

expect.extend({ toHavePattern });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toHavePattern(expected: RegExp): R;
    }
  }
}
