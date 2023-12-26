import { buildRegex } from '../src/builders';
import type { RegexNode } from '../src/types';
import { asNodeArray } from '../src/utils/nodes';
import { isRegexNode } from './utils';

export function toMatchGroups(
  this: jest.MatcherContext,
  nodes: RegexNode | RegexNode[],
  input: string,
  expected: string[]
) {
  nodes = asNodeArray(nodes);

  nodes.forEach((e) => {
    if (!isRegexNode(e)) {
      throw new Error(
        `\`toMatchGroups()\` received an array of RegexElements and strings.`
      );
    }
  });

  const regex = buildRegex(nodes);
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
