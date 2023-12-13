import type { RegexElement } from './types';
import { EncoderPriority, type EncoderNode } from './types-internal';
import { encodeChoiceOf } from './components/choiceOf';
import { encodeCharacterClass } from './character-classes/encoder';
import {
  encodeOne,
  encodeOneOrMore,
  encodeOptionally,
  encodeZeroOrMore,
} from './quantifiers/base';
import { encodeRepeat } from './quantifiers/repeat';
import { concatNodes, escapeText } from './utils';
import { encodeCapture } from './capture';

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
    return encodeRepeat(element.config, encodeSequence(element.children));
  }

  if (element.type === 'one') {
    return encodeOne(encodeSequence(element.children));
  }

  if (element.type === 'oneOrMore') {
    return encodeOneOrMore(encodeSequence(element.children));
  }

  if (element.type === 'optionally') {
    return encodeOptionally(encodeSequence(element.children));
  }

  if (element.type === 'zeroOrMore') {
    return encodeZeroOrMore(encodeSequence(element.children));
  }

  if (element.type === 'capture') {
    return encodeCapture(encodeSequence(element.children));
  }

  // @ts-expect-error User passed incorrect type
  throw new Error(`Unknown elements type ${element.type}`);
}

function encodeText(text: string): EncoderNode {
  if (text.length === 0) {
    throw new Error('`encodeText`: received text should not be empty');
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
