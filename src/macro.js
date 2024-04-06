import { createMacro, MacroError } from 'babel-plugin-macros';
import { buildRegExp } from '.';
import pkg from '../package.json';

// `createMacro` is simply a function that ensures your macro is only
// called in the context of a babel transpilation and will throw an
// error with a helpful message if someone does not have babel-plugin-macros
// configured correctly
module.exports = createMacro(tsRegexMacro);

function tsRegexMacro({ references, state, babel }) {
  console.log('References: ', references);

  references.buildRegExp.forEach(({ parentPath: buildRegExpCall }) => {
    if (!buildRegExpCall.isCallExpression()) {
      throw new MacroError(
        `${pkg.name}/macro should be used as function call, instead you have used it as part of ${regexgenCall.node.type}.`,
      );
    }

    console.log('BuildRegexCall', buildRegExpCall);

    const args = buildRegExpCall.get('arguments');
    const value = compileRegex(args[0]);
    buildRegExpCall.replaceWith(babel.types.regExpLiteral(value));
  });

  // const encoded = buildRegExp('a');
  // argumentsPaths[0].parentPath.replaceWith(encoded);
  // // console.log('State: ', state);
  // console.log('Babel: ', babel);
  // state is the second argument you're passed to a visitor in a
  // normal babel plugin. `babel` is the `babel-plugin-macros` module.
  // do whatever you like to the AST paths you find in `references`
  // read more below...
}

function compileRegex(path) {
  if (path.isStringLiteral()) {
    return path.node.value;
  }

  throw new MacroError(`${pkg.name} "buildRegExp" can't handle ${path.node.type}.`);
}
