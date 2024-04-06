import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import MyMacro from '../macro.cts'

      MyMacro({someOption: true}, \`
        some stuff
      \`)
    `,
  ],
});
