export type RegexElement = string | RegexCharacterClass | RegexQuantifier;

export type RegexCharacterClass = Whitespace | Digit | Word | Any;

export type RegexQuantifier =
  | One
  | OneOrMore
  | Optionally
  | ZeroOrMore
  | Repeat;

// Character classes
export type Whitespace = { type: 'whitespace' };

export type Digit = { type: 'digit' };

export type Word = { type: 'word' };

export type Any = { type: 'any' };

// Quantifiers
export type One = {
  type: 'one';
  children: RegexElement[];
};

export type OneOrMore = {
  type: 'oneOrMore';
  children: RegexElement[];
};

export type Optionally = {
  type: 'optionally';
  children: RegexElement[];
};

export type RepeatConfig =
  | { min: number; max?: number }
  | {
      count: number;
    };

export type Repeat = {
  type: 'repeat';
  children: RegexElement[];
  config: RepeatConfig;
};

export type ZeroOrMore = {
  type: 'zeroOrMore';
  children: RegexElement[];
};
