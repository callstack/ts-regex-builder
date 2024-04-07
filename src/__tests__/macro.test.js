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
      title: 'ChoiceOf: single element',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(choiceOf('a'));
      `,
      output: '/a/;',
    },
    {
      title: 'ChoiceOf: sequence of single element',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(choiceOf(['a']));
      `,
      output: '/a/;',
    },
    {
      title: 'ChoiceOf: two single elements',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(choiceOf('a','b'));
      `,
      output: '/a|b/;',
    },
    {
      title: 'ChoiceOf: more sequences',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(choiceOf('a',['b', 'cd'], ['efd']));
      `,
      output: '/a|bcd|efd/;',
    },
    {
      title: 'Regex: single element',
      code: `
        import { buildRegExp, } from '../macro.js'
        buildRegExp(regex('xyz'));
      `,
      output: '/xyz/;',
    },
    {
      title: 'Regex: mixed sequence',
      code: `
        import { buildRegExp, } from '../macro.js'
        buildRegExp(regex(['x1', /(x2)+?/, zeroOrMore('x3')]));
      `,
      output: '/x1(?:(x2)+?)(?:x3)*/;',
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
      title: 'Capture: sequence with named',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(capture(['a', 'b'], { name: 'hello' }));
      `,
      output: '/(?<hello>ab)/;',
    },
    {
      title: 'Ref: capture with ref',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp([capture(['ab'], { name: 'hi' }), ref('hi')]);
      `,
      output: '/(?<hi>ab)\\k<hi>/;',
    },
    {
      title: 'ZeroOrMore: single char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(zeroOrMore('a'));
      `,
      output: '/a*/;',
    },
    {
      title: 'ZeroOrMore: multi-char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(zeroOrMore('abc'));
      `,
      output: '/(?:abc)*/;',
    },
    {
      title: 'ZeroOrMore: sequence of string literals',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(zeroOrMore(['a', 'bc']));
      `,
      output: '/(?:abc)*/;',
    },
    {
      title: 'ZeroOrMore: non-greedy option',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(zeroOrMore(['a', 'b'], { greedy: false }));
      `,
      output: '/(?:ab)*?/;',
    },
    {
      title: 'OneOrMore: single char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(oneOrMore('a'));
      `,
      output: '/a+/;',
    },
    {
      title: 'OneOrMore: multi-char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(oneOrMore('abc'));
      `,
      output: '/(?:abc)+/;',
    },
    {
      title: 'OneOrMore: sequence of string literals',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(oneOrMore(['a', 'bc']));
      `,
      output: '/(?:abc)+/;',
    },
    {
      title: 'OneOrMore: non-greedy option',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(oneOrMore(['a', 'b'], { greedy: false }));
      `,
      output: '/(?:ab)+?/;',
    },
    {
      title: 'Optional: single char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(optional('a'));
      `,
      output: '/a?/;',
    },
    {
      title: 'Optional: multi-char string literal',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(optional('abc'));
      `,
      output: '/(?:abc)?/;',
    },
    {
      title: 'Optional: sequence of string literals',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(optional(['a', 'bc']));
      `,
      output: '/(?:abc)?/;',
    },
    {
      title: 'Optional: non-greedy option',
      code: `
        import { buildRegExp } from '../macro.js'
        buildRegExp(optional(['a', 'b'], { greedy: false }));
      `,
      output: '/(?:ab)??/;',
    },
  ],
});
