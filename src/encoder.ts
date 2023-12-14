import type { RegexElement } from './types';
import { EncoderPriority, type EncoderNode } from './types-internal';
import { encodeChoiceOf } from './components/choiceOf';
import { encodeCharacterClass } from './character-classes/encoder';
import { baseQuantifiers, isBaseQuantifier } from './quantifiers/base';
import { encodeRepeat } from './quantifiers/repeat';
import { concatNodes, escapeText } from './utils';

export function encodeSequence(elements: RegexElement[]): EncoderNode {
  return concatNodes(elements.map((c) => encodeElement(c)));
}

export function encodeElement(element: RegexElement): EncoderNode {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (element.type === 'characterClass') {
    return encodeCharacterClass(element);
  }

  if (element.type === 'choiceOf') {
    return encodeChoiceOf(element, encodeElement);
  }

  if (element.type === 'repeat') {
    const compiledChildren = encodeSequence(element.children);
    return encodeRepeat(element.config, compiledChildren);
  }

  if (isBaseQuantifier(element)) {
    const compiledChildren = encodeSequence(element.children);
    const encoder = baseQuantifiers[element.type];
    return encoder(compiledChildren);
  }

  // @ts-expect-error User passed incorrect type
  throw new Error(`Unknown elements type ${element.type}`);
}

function encodeText(text: string): EncoderNode {
  if (text.length === 0) {
    throw new Error('`compileText`: received text should not be empty');
  }

  if (text.length === 1) {
    return {
      priority: EncoderPriority.Atom,
      pattern: escapeText(text),
    };
  }

  return {
    priority: EncoderPriority.Sequence,
    pattern: escapeText(text),
  };
}
