import type { EncoderResult } from '../encoder/types';

export type RegexElement = Capture | CharacterClass | ChoiceOf | Quantifier;

export type Quantifier = One | OneOrMore | Optionally | ZeroOrMore | Repeat;

export type CharacterClass = {
  type: 'characterClass';
  characters: string[];
  encode: () => EncoderResult;
};

// Components
export type ChoiceOf = {
  type: 'choiceOf';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};

// Quantifiers
export type One = {
  type: 'one';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};

export type OneOrMore = {
  type: 'oneOrMore';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};

export type Optionally = {
  type: 'optionally';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};

export type ZeroOrMore = {
  type: 'zeroOrMore';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};

export type Repeat = {
  type: 'repeat';
  children: Array<RegexElement | string>;
  config: RepeatConfig;
  encode: () => EncoderResult;
};

export type RepeatConfig = { count: number } | { min: number; max?: number };

// Captures
export type Capture = {
  type: 'capture';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
};
