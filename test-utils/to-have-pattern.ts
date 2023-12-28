import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';
import { asNodeArray } from '../src/utils/nodes';
import { isRegexNode } from './utils';

export function toHavePattern(
  this: jest.MatcherContext,
  received: RegexNode | RegexNode[],
  expected: RegExp
) {
  asNodeArray(received).forEach((e) => {
    if (!isRegexNode(e)) {
      throw new Error(`\`toHavePattern()\` received an array of RegexElements and strings.`);
    }
  });

  const receivedPattern = buildRegex(received).source;
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
