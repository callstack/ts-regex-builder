import type { RegexElement, RegexSequence } from '../types';
import { ensureArray } from '../utils/elements';
import { escapeText } from '../utils/text';
import type { EncodeResult } from './types';

export function encodeSequence(sequence: RegexSequence): EncodeResult {
  const elements = ensureArray(sequence);
  const encodedNodes = elements.map((n) => encodeNode(n));
  return concatSequence(encodedNodes);
}

export function encodeAtom(sequence: RegexSequence): EncodeResult {
  return wrapAtom(encodeSequence(sequence));
}

function encodeNode(element: RegexElement): EncodeResult {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (typeof element === 'object' && element instanceof RegExp) {
    return encodeRegExp(element);
  }

  if (typeof element === 'object' && 'pattern' in element) {
    return element;
  }

  if (typeof element === 'object' && typeof element.encode !== 'function') {
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

function encodeRegExp(regexp: RegExp): EncodeResult {
  const pattern = regexp.source;

  // Encode at safe precedence
  return {
    precedence: isAtomicPattern(pattern) ? 'atom' : 'disjunction',
    pattern,
  };
}

// This is intended to catch only some popular atomic patterns like char classes.
function isAtomicPattern(pattern: string): boolean {
  if (pattern.length === 1) {
    return true;
  }

  if (pattern.startsWith('[') && pattern.endsWith(']') && pattern.match(/[[\]]/g)?.length === 2) {
    return true;
  }

  if (pattern.startsWith('(') && pattern.endsWith(')') && pattern.match(/[()]/g)?.length === 2) {
    return true;
  }

  return false;
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
