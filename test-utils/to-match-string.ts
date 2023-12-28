import type { RegexSequence } from '../src/types';
import { asRegExp } from './utils';

export function toMatchString(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: string
) {
  const receivedRegex = asRegExp(received);
  const matchResult = expected.match(receivedRegex);
  const options = {
    isNot: this.isNot,
  };

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
