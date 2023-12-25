import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import type { Anchor } from './types';

export const startOfString: Anchor = {
  type: 'anchor',
  symbol: '^',
};

export const endOfString: Anchor = {
  type: 'anchor',
  symbol: '$',
};

export function encodeAnchor(anchor: Anchor): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: anchor.symbol,
  };
}
