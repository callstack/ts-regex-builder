import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';
import { isRegexNode } from '../src/utils/nodes';

export function toMatchGroups(
  this: jest.MatcherContext,
  elements: RegexNode | RegexNode[],
  input: string,
  expected: string[]
) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  elements.forEach((e) => {
    if (!isRegexNode(e)) {
      throw new Error(
        `\`toMatchGroups()\` received an array of RegexElements and strings.`
      );
    }
  });

  const regex = buildRegex(elements);
  const options = {
    isNot: this.isNot,
  };

  const execResult = regex.exec(input);
  const actual = execResult ? [...execResult] : [];

  return {
    pass: this.equals(actual, expected),
    message: () =>
      this.utils.matcherHint('toMatchGroups', undefined, undefined, options) +
      '\n\n' +
      `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(
        expected
      )}\n` +
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
