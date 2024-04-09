import type { RegexSequence } from '../src/types';
import { wrapRegExp } from './utils';

interface MatchTypeOptions {
  exactString: boolean;
  substring?: string;
}

export function toMatchString(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: string,
  matchType?: MatchTypeOptions,
) {
  const receivedRegex = wrapRegExp(received);
  const matchResult = expected.match(receivedRegex);

  let pass: boolean = false;
  if (matchType === undefined) pass = matchResult !== null && matchResult[0] === expected;
  else if (matchType.exactString) pass = matchResult !== null && matchResult[0] === expected;
  else if (typeof matchType.substring === 'string') {
    pass = matchResult !== null && matchResult[0].includes(matchType.substring);
  } else {
    pass = matchResult !== null;
  }

  const options = {
    isNot: this.isNot,
  };

  return {
    pass: pass,
    message: () => `
      ${this.utils.matcherHint('toMatchString', undefined, undefined, options)}\n\n
      Expected: ${this.isNot ? 'not ' : ''} matching ${this.utils.printExpected(expected)}\n
      Received pattern: ${this.utils.printReceived(receivedRegex.source)}
      `,
  };
}

expect.extend({ toMatchString });

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toMatchString(expected: string, matchType?: MatchTypeOptions): R;
    }
  }
}
