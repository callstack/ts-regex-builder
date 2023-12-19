import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from './types';
import { concatNodes, escapeText } from './utils';

export function encodeSequence(
  elements: Array<RegexElement | string>
): EncoderResult {
  return concatNodes(elements.map((c) => encodeElement(c)));
}

export function encodeElement(element: RegexElement | string): EncoderResult {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  return element.encode();
}

function encodeText(text: string): EncoderResult {
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
