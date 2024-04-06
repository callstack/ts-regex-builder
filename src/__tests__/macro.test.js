import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp('a');
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp('abc');
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(['d', 'e', 'f']);
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(['d', 'e', 'f']);
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(capture('a'));
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(zeroOrMore('a'));
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(oneOrMore('a'));
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(optional('a'));
    `,
    `
    import { buildRegExp } from '../macro.js'
    buildRegExp(choiceOf('a','b'));
    `,
  ],
});
