import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toEqualRegex(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: RegExp,
) {
  received = wrapRegExp(received);

  const options = {
    isNot: this.isNot,
  };

  return {
    pass: expected.source === received.source && expected.flags === received.flags,
    message: () =>
      this.utils.matcherHint('toHavePattern', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}`,
  };
}

expect.extend({ toEqualRegex });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toEqualRegex(expected: RegExp): R;
    }
  }
}
