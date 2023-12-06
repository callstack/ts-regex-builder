export type RegexElement = string | RegexQuantifier;

export type RegexQuantifier = One | OneOrMore | Optionally | ZeroOrMore;

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

export type ZeroOrMore = {
  type: 'zeroOrMore';
  children: RegexElement[];
};
