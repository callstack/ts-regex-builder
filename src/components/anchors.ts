import type { EncodeOutput } from '../encoder/types';
import type { RegexComponent } from '../types';

export interface Anchor extends RegexComponent {
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
