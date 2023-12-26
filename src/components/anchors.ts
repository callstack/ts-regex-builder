import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import type { RegexElement } from './types';

export interface Anchor extends RegexElement {
  type: 'anchor';
  symbol: string;
}

export const startOfString: Anchor = {
  type: 'anchor',
  symbol: '^',
  encode: encodeAnchor,
};

export const endOfString: Anchor = {
  type: 'anchor',
  symbol: '$',
  encode: encodeAnchor,
};

function encodeAnchor(this: Anchor): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: this.symbol,
  };
}
