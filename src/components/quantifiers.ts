import { encodeSequence } from '../encoder';
import { toAtom } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export class One implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    if (children.length === 0) {
      throw new Error('"one" should receive at least one element');
    }

    this.children = children;
  }

  encode(): EncoderResult {
    return encodeSequence(this.children);
  }
}

export function one(...children: Array<RegexElement | string>): One {
  return new One(children);
}

export class OneOrMore implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    if (children.length === 0) {
      throw new Error('"oneOrMore" should receive at least one element');
    }

    this.children = children;
  }

  encode(): EncoderResult {
    const children = encodeSequence(this.children);
    return {
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(children)}+`,
    };
  }
}

export function oneOrMore(
  ...children: Array<RegexElement | string>
): OneOrMore {
  return new OneOrMore(children);
}

export class Optionally implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    if (children.length === 0) {
      throw new Error('"optionally" should receive at least one element');
    }

    this.children = children;
  }

  encode(): EncoderResult {
    const children = encodeSequence(this.children);
    return {
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(children)}?`,
    };
  }
}

export function optionally(
  ...children: Array<RegexElement | string>
): Optionally {
  return new Optionally(children);
}

export class ZeroOrMore implements RegexElement {
  public children: Array<RegexElement | string>;

  constructor(children: Array<RegexElement | string>) {
    if (children.length === 0) {
      throw new Error('"zeroOrMore" should receive at least one element');
    }

    this.children = children;
  }

  encode(): EncoderResult {
    const children = encodeSequence(this.children);
    return {
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(children)}*`,
    };
  }
}

export function zeroOrMore(
  ...children: Array<RegexElement | string>
): ZeroOrMore {
  return new ZeroOrMore(children);
}
