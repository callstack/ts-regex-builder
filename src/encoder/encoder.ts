import type { RegexElement } from '../types';
import { escapeText } from '../utils/text';
import type { EncodeResult } from './types';

export function encodeSequence(elements: RegexElement[]): EncodeResult {
  const encodedNodes = elements.map((n) => encodeNode(n));
  return concatSequence(encodedNodes);
}

export function encodeAtom(elements: RegexElement[]): EncodeResult {
  return wrapAtom(encodeSequence(elements));
}

function encodeNode(element: RegexElement): EncodeResult {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (typeof element.encode !== 'function') {
    throw new Error(`\`encodeNode\`: unknown element type ${element.type}`);
  }

  return element.encode();
}

function encodeText(text: string): EncodeResult {
  if (text.length === 0) {
    throw new Error('`encodeText`: received text should not be empty');
  }

  // Optimize for single character case
  if (text.length === 1) {
    return {
      precedence: 'atom',
      pattern: escapeText(text),
    };
  }

  return {
    precedence: 'sequence',
    pattern: escapeText(text),
  };
}

function concatSequence(encoded: EncodeResult[]): EncodeResult {
  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: encoded
      .map((n) => (n.precedence === 'disjunction' ? wrapAtom(n) : n).pattern)
      .join(''),
  };
}

function wrapAtom(encoded: EncodeResult): EncodeResult {
  if (encoded.precedence === 'atom') {
    return encoded;
  }

  return {
    precedence: 'atom',
    pattern: `(?:${encoded.pattern})`,
  };
}
