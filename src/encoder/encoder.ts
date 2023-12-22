import type { RegexElement } from '../components/types';
import { encodeCapture } from '../components/capture';
import { encodeCharacterClass } from '../components/character-class';
import { encodeChoiceOf } from '../components/choice-of';
import {
  encodeOne,
  encodeOneOrMore,
  encodeOptionally,
  encodeZeroOrMore,
} from '../components/quantifiers';
import { encodeRepeat } from '../components/repeat';
import { concatNodes, escapeText } from '../utils';
import { type EncoderNode, EncoderPrecedence } from './types';

export function encodeSequence(
  elements: Array<RegexElement | string>
): EncoderNode {
  return concatNodes(elements.map((c) => encodeElement(c)));
}

export function encodeElement(element: RegexElement | string): EncoderNode {
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
  throw new Error(`Unknown element type ${element.type}`);
}

function encodeText(text: string): EncoderNode {
  if (text.length === 0) {
    throw new Error('`encodeText`: received text should not be empty');
  }

  if (text.length === 1) {
    return {
      precedence: EncoderPrecedence.Atom,
      pattern: escapeText(text),
    };
  }

  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: escapeText(text),
  };
}
