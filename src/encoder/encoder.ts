import type { RegexNode } from '../components/types';
import { escapeText } from '../utils/text';

import { type EncoderNode, EncoderPrecedence } from './types';
import { concatNodes } from './utils';

export function encodeSequence(nodes: RegexNode[]): EncoderNode {
  return concatNodes(nodes.map((n) => encodeNode(n)));
}

export function encodeNode(node: RegexNode): EncoderNode {
  if (typeof node === 'string') {
    return encodeText(node);
  }

  if (typeof node.encode !== 'function') {
    throw new Error('`encodeNode`: Unknown element type unknown');
  }

  return node.encode();
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
