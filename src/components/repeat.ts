import { encodeSequence } from '../encoder';
import { toAtom } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export interface Repeat extends RegexElement {
  type: 'repeat';
  children: Array<RegexElement | string>;
  config: RepeatConfig;
  encode: () => EncoderResult;
}

export type RepeatConfig = { count: number } | { min: number; max?: number };

export function repeat(
  config: RepeatConfig,
  ...children: Array<RegexElement | string>
): Repeat {
  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  return {
    type: 'repeat',
    children,
    config,
    encode: encodeRepeat,
  };
}

function encodeRepeat(this: Repeat): EncoderResult {
  const children = encodeSequence(this.children);
  if ('count' in this.config) {
    return {
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(children)}{${this.config.count}}`,
    };
  }

  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(children)}{${this.config.min},${
      this.config?.max ?? ''
    }}`,
  };
}
