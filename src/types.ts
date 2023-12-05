export type RegexComponent = string | RegexQuantifier;

export type RegexQuantifier = OneOrMore | Optionally;

// Quantifiers
export type OneOrMore = {
  type: 'oneOrMore';
  children: RegexComponent[];
};

export type Optionally = {
  type: 'optionally';
  children: RegexComponent[];
};
