import { buildPattern } from '../src/builders';
import type { RegexNode } from '../src/components/types';
import { isRegexNode } from '../src/utils/nodes';

export function toHavePattern(
  this: jest.MatcherContext,
  elements: RegexNode | RegexNode[],
  expected: string
) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  elements.forEach((e) => {
    if (!isRegexNode(e)) {
      throw new Error(
        `\`toHavePattern()\` received an array of RegexElements and strings.`
      );
    }
  });

  const received = buildPattern(elements);

  const options = {
    isNot: this.isNot,
  };

  return {
    pass: expected === received,
    message: () =>
      this.utils.matcherHint('toHavePattern', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(
        expected
      )}\n` +
      `Received: ${this.utils.printReceived(received)}`,
  };
}

expect.extend({ toHavePattern });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toHavePattern(expected: string): R;
    }
  }
}
