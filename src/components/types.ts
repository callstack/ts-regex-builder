export type RegexElement =
  | string
  | CharacterClass
  | ChoiceOf
  | Quantifier
  | Capture;

export type Quantifier = One | OneOrMore | Optionally | ZeroOrMore | Repeat;

export type CharacterClass = {
  type: 'characterClass';
  characters: string[];
};

// Components
export type ChoiceOf = {
  type: 'choiceOf';
  children: RegexElement[];
};

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

export type Repeat = {
  type: 'repeat';
  children: RegexElement[];
  config: RepeatConfig;
};

export type RepeatConfig = { count: number } | { min: number; max?: number };

// Captures
export type Capture = {
  type: 'capture';
  children: RegexElement[];
};
