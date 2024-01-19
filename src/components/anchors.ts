import type { EncodeResult } from '../encoder/types';
import type { RegexConstruct } from '../types';

export interface Anchor extends RegexConstruct {
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

function encodeAnchor(this: Anchor): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: this.symbol,
  };
}
