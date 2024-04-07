import { createMacro, MacroError } from 'babel-plugin-macros';
import pkg from '../package.json';
import { buildPattern, capture, choiceOf, oneOrMore, optional, zeroOrMore } from '.';

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
    const regexSequence = evalRegexSequence(args[0]);
    const pattern = buildPattern(regexSequence);
    console.log('VALUE', pattern);
    buildRegExpCall.replaceWith(babel.types.regExpLiteral(pattern));
  });
}

function evalRegexSequence(path) {
  if (path.isArrayExpression()) {
    return evalElementList(path.get('elements'));
  }

  return evalRegexElement(path);
}

function evalRegexElement(path) {
  if (path.isStringLiteral()) {
    return path.node.value;
  }

  if (path.isRegExpLiteral()) {
    return new RegExp(path.node.pattern, path.node.flags);
  }

  if (path.isCallExpression()) {
    const callee = path.node.callee;
    const args = path.get('arguments');
    switch (callee.name) {
      case 'choiceOf':
        return choiceOf(...args.map(evalRegexElement));
      case 'capture':
        return capture(evalRegexSequence(args[0]));
      case 'zeroOrMore':
        return zeroOrMore(evalRegexSequence(args[0]));
      case 'oneOrMore':
        return oneOrMore(evalRegexSequence(args[0]));
      case 'optional':
        return optional(evalRegexSequence(args[0]));
      default:
        throw new MacroError(
          `${pkg.name} "handleRegexElement" can't handle CallExpression "${callee.name}".`,
        );
    }
  }

  logNode(path, 'UNKNOWN ELEMENT');
  throw new MacroError(`${pkg.name} "handleRegexElement" can't handle ${path.node?.type}.`);
}

function evalElementList(paths) {
  return paths.map(evalRegexElement);
}

function logNode(node, label) {
  const { parentPath, hub, context, scope, ...rest } = node;
  console.log(label, ':', node.type, ':', rest);
}
