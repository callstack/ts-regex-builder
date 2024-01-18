import type { RegexSequence } from '../src/types';
import { asRegExp } from './utils';

export function toHavePattern(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: RegExp,
) {
  const receivedPattern = asRegExp(received).source;
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
