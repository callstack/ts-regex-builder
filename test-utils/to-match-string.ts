import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

export function toMatchString(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: string,
) {
  const receivedRegex = wrapRegExp(received);
  const matchResult = expected.match(receivedRegex);
  const options = {
    isNot: this.isNot,
  };

  return {
    pass: matchResult !== null,
    message: () =>
      this.utils.matcherHint('toMatchString', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''} matching ${this.utils.printExpected(expected)}\n` +
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
