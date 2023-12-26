import type { RegexNode } from '../types';
import { escapeText } from '../utils/text';
import type { EncodeOutput } from './types';
import { concatNodes } from './utils';

export function encodeSequence(nodes: RegexNode[]): EncodeOutput {
  return concatNodes(nodes.map((n) => encodeNode(n)));
}

export function encodeNode(node: RegexNode): EncodeOutput {
  if (typeof node === 'string') {
    return encodeText(node);
  }

  if (typeof node.encode !== 'function') {
    throw new Error('`encodeNode`: Unknown element type unknown');
  }

  return node.encode();
}

function encodeText(text: string): EncodeOutput {
  if (text.length === 0) {
    throw new Error('`encodeText`: received text should not be empty');
  }

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
