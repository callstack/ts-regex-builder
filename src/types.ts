export type RegexElement = string | RegexQuantifier;

export type RegexQuantifier =
  | One
  | OneOrMore
  | Optionally
  | ZeroOrMore
  | Repeat;

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
