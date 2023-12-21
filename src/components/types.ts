export type RegexElement = Capture | CharacterClass | ChoiceOf | Quantifier;

export type Quantifier = One | OneOrMore | Optionally | ZeroOrMore | Repeat;

export type CharacterClass = {
  type: 'characterClass';
  characters: string[];
  inverted: boolean;
};

// Components
export type ChoiceOf = {
  type: 'choiceOf';
  children: Array<RegexElement | string>;
};

// Quantifiers
export type One = {
  type: 'one';
  children: Array<RegexElement | string>;
};

export type OneOrMore = {
  type: 'oneOrMore';
  children: Array<RegexElement | string>;
};

export type Optionally = {
  type: 'optionally';
  children: Array<RegexElement | string>;
};

export type ZeroOrMore = {
  type: 'zeroOrMore';
  children: Array<RegexElement | string>;
};

export type Repeat = {
  type: 'repeat';
  children: Array<RegexElement | string>;
  config: RepeatConfig;
};

export type RepeatConfig = { count: number } | { min: number; max?: number };

// Captures
export type Capture = {
  type: 'capture';
  children: Array<RegexElement | string>;
};
