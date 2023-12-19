import { encodeSequence } from '../encoder';
import { toAtom } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export type RepeatConfig = { count: number } | { min: number; max?: number };

export class Repeat implements RegexElement {
  public children: Array<RegexElement | string>;
  public config: RepeatConfig;

  constructor(children: Array<RegexElement | string>, config: RepeatConfig) {
    if (children.length === 0) {
      throw new Error('"repeat" should receive at least one element');
    }

    this.children = children;
    this.config = config;
  }

  encode(): EncoderResult {
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
}
export function repeat(
  config: RepeatConfig,
  ...children: Array<RegexElement | string>
): Repeat {
  return new Repeat(children, config);
}
