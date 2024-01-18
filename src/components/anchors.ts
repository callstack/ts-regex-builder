import type { EncodeOutput } from '../encoder/types';
import type { RegexComponentResult } from '../types';

export interface Anchor extends RegexComponentResult {
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

function encodeAnchor(this: Anchor): EncodeOutput {
  return {
    precedence: 'sequence',
    pattern: this.symbol,
  };
}
