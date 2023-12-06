export type RegexComponent = string | RegexQuantifier;

export type RegexQuantifier = One | OneOrMore | Optionally | ZeroOrMore;

// Quantifiers
export type One = {
  type: 'one';
  children: RegexComponent[];
};

export type OneOrMore = {
  type: 'oneOrMore';
  children: RegexComponent[];
};

export type Optionally = {
  type: 'optionally';
  children: RegexComponent[];
};

export type ZeroOrMore = {
  type: 'zeroOrMore';
  children: RegexComponent[];
};
