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
  ],
});
