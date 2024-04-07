import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  babelOptions: { filename: __filename },
  tests: [
    {
      title: 'Single element: string literal (single char)',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp('a');
      `,
      output: '/a/;',
    },
    {
      title: 'Single element: string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp('abc');
      `,
      output: '/abc/;',
    },
    {
      title: 'Single element: RegExp literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(/a+b?(c)*/);
      `,
      output: '/a+b?(c)*/;',
    },
    {
      title: 'RegexSequence: sequence of one string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(['abc']);
      `,
      output: '/abc/;',
    },
    {
      title: 'RegexSequence: sequence of string literals',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(['a', 'bc', 'def']);
      `,
      output: '/abcdef/;',
    },
    {
      title: 'RegexSequence: sequence of mixed string and RegExp literals',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(['d', /(e?)/, 'f']);
      `,
      output: '/d(e?)f/;',
    },
    {
      title: 'Capture: single char',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(capture('a'));
      `,
      output: '/(a)/;',
    },
    {
      title: 'Capture: sequence',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(capture(['a', 'b', 'c']));
      `,
      output: '/(abc)/;',
    },
    {
      title: 'ZeroOrMore: single char',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(zeroOrMore('a'));
      `,
      output: '/a*/;',
    },
    {
      title: 'OneOrMore: single char',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(oneOrMore('a'));
      `,
      output: '/a+/;',
    },
    {
      title: 'Optional: single char',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(optional('a'));
      `,
      output: '/a?/;',
    },
    {
      title: 'ChoiceOf: two single elements',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(choiceOf('a','b'));
      `,
      output: '/a|b/;',
    },
  ],
});
