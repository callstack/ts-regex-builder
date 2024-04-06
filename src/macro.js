import { createMacro, MacroError } from 'babel-plugin-macros';
import pkg from '../package.json';
import { buildPattern, capture } from '.';

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

    //console.log('BuildRegexCall', buildRegExpCall);

    const args = buildRegExpCall.get('arguments');
    const regexAst = handleRegexSequence(args[0]);
    const pattern = buildPattern(regexAst);
    console.log('VALUE', pattern);
    buildRegExpCall.replaceWith(babel.types.regExpLiteral(pattern));
  });
}

function handleRegexSequence(path) {
  if (path.isArrayExpression()) {
    //console.log('Sequence.Array', path.get('elements'));
    return path.get('elements').map(handleRegexElement).join('');
  }

  //console.log('Sequence.Single', path);
  return handleRegexElement(path);
}

function handleRegexElement(path) {
  if (path.isStringLiteral()) {
    //console.log('Element.StringLiteral', path);
    return path.node.value;
  }

  if (path.isCallExpression()) {
    console.log('Element.CallExpression');

    const callee = path.get('callee');
    const calleeName = callee.node.name;
    const args = callee.get('arguments');
    switch (calleeName) {
      case 'capture':
        return capture(handleRegexSequence(args));
      default:
        throw new MacroError(
          `${pkg.name} "handleRegexElement" can't handle CallExpression "${calleeName}".`,
        );
    }
  }

  console.log('Unknown element:', path);
  throw new MacroError(`${pkg.name} "handleRegexElement" can't handle ${path.node?.type}.`);
}
