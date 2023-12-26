import type { RegexNode } from '../types';
import { escapeText } from '../utils/text';
import type { EncodeOutput } from './types';

export function encodeSequence(nodes: RegexNode[]): EncodeOutput {
  const encodedNodes = nodes.map((n) => encodeNode(n));
  return concatSequence(encodedNodes);
}

export function encodeAtom(nodes: RegexNode[]): EncodeOutput {
  return asAtom(encodeSequence(nodes));
}

function encodeNode(node: RegexNode): EncodeOutput {
  if (typeof node === 'string') {
    return encodeText(node);
  }

  if (typeof node.encode !== 'function') {
    throw new Error(`\`encodeNode\`: unknown element type ${node.type}`);
  }

  return node.encode();
}

function encodeText(text: string): EncodeOutput {
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

function concatSequence(encoded: EncodeOutput[]): EncodeOutput {
  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: encoded
      .map((n) => (n.precedence === 'alternation' ? asAtom(n) : n).pattern)
      .join(''),
  };
}

function asAtom(encoded: EncodeOutput): EncodeOutput {
  if (encoded.precedence === 'atom') {
    return encoded;
  }

  return {
    precedence: 'atom',
    pattern: `(?:${encoded.pattern})`,
  };
}
