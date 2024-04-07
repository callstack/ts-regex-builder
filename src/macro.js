import { createMacro, MacroError } from 'babel-plugin-macros';
import pkg from '../package.json';
import { buildPattern, capture, choiceOf, oneOrMore, optional, ref, regex, zeroOrMore } from '.';

// `createMacro` is simply a function that ensures your macro is only
// called in the context of a babel transpilation and will throw an
// error with a helpful message if someone does not have babel-plugin-macros
// configured correctly
module.exports = createMacro(tsRegexMacro);

function tsRegexMacro({ references, state, babel }) {
  //console.log('References: ', references);

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
    //console.log('VALUE', pattern);
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
        return choiceOf(...args.map(evalRegexSequence));
      case 'regex':
        return regex(evalRegexSequence(args[0]));
      case 'capture':
        return capture(evalRegexSequence(args[0]), evalOptionsObject(args[1]));
      case 'ref':
        return ref(args[0].node.value);
      case 'zeroOrMore':
        return zeroOrMore(evalRegexSequence(args[0]), evalOptionsObject(args[1]));
      case 'oneOrMore':
        return oneOrMore(evalRegexSequence(args[0]), evalOptionsObject(args[1]));
      case 'optional':
        return optional(evalRegexSequence(args[0]), evalOptionsObject(args[1]));
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

function evalOptionsObject(path) {
  if (!path) {
    return undefined;
  }

  if (!path.isObjectExpression()) {
    throw new MacroError(
      `${pkg.name} "evalOptionsObject" expected ObjectExpression, got ${path.node.type}.`,
    );
  }

  logPath('Options Path:', path.get('properties'));
  console.log('Options Node: ', path.node.properties);

  const options = {};
  path.node.properties.forEach((propNode) => {
    if (propNode.key.type !== 'Identifier') {
      throw new MacroError('Options object keys must be string identifiers.');
    }

    if (propNode.value.type !== 'StringLiteral' && propNode.value.type !== 'BooleanLiteral') {
      throw new MacroError('Options object values must be string or boolean literals.');
    }

    options[propNode.key.name] = propNode.value.value;
  });

  return options;
}

function logPath(label, path) {
  const { parentPath, hub, context, scope, container, ...rest } = path;
  console.log(label, ':', path.type, ':', rest);
}

function logNode(label, node) {
  console.log(label, ':', node.type, ':', node);
}
