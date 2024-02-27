# API

## Types

### `RegexSequence`

The sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

### `RegexElement`

Fundamental building blocks of a regular expression, defined as either a regex construct, a string, or a `RegExp` literal (`/.../`).

### `RegexConstruct`

The common type for all regex constructs like character classes, quantifiers, and anchors. You should not need to use this type directly, it is returned by all regex construct functions.

Note: the shape of the `RegexConstruct` is considered private and may change in a breaking way without a major release. We will focus on maintaining the compatibility of regexes built with 


## Builder

### `buildRegExp()`

```ts
function buildRegExp(
  sequence: RegexSequence,
  flags?: {
    global?: boolean;
    ignoreCase?: boolean;
    multiline?: boolean;
    hasIndices?: boolean;
  },
): RegExp;
```

The `buildRegExp` is a top-level function responsible for building a JavaScript-native `RegExp` object from passed regex sequence.

It optionally accepts a list of regex flags:

- `global` - find all matches in a string instead of just the first one.
- `ignoreCase` - perform case-insensitive matching.
- `multiline` - treat the start and end of each line in a string as the beginning and end of the string.
- `hasIndices` - provide each captured group's start and end indices in a match.

## Constructs

These functions and objects represent available regex constructs.

### `choiceOf()`

```ts
function choiceOf(
  ...alternatives: RegexSequence[]
): ChoiceOf {
```

Regex syntax: `a|b|c`.

The `choiceOf` (disjunction) construct matches one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

Example: `choiceOf("color", "colour")` matches either `color` or `colour` pattern.

### `capture()`

```ts
function capture(
  sequence: RegexSequence
): Capture
```

Regex syntax: `(...)`.

Captures, also known as capturing groups, extract and store parts of the matched string for later use.

> [!NOTE]
> TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required. E.g., `zeroOrMore(["abc"])` is encoded as `(?:abc)+`.

### `lookahead()`

```ts
function lookahead(
  sequence: RegexSequence
): Lookahead
```

Regex syntax: `(?=...)`.

Allows for conditional matching by checking for subsequent patterns in regexes without consuming them.

### `negativeLookahead()`

```ts
function negativeLookahead(
  sequence: RegexSequence
): NegativeLookahead
```

Regex syntax: `(?!...)`.

Allows for matches to be rejected if a specified subsequent pattern is present, without consuming any characters.

### `lookbehind()`

```ts
function lookbehind(
  sequence: RegexSequence
): Lookahead
```

Regex syntax: `(?<=...)`.

Allows for conditional matching by checking for preceeding patterns in regexes without consuming them.

### `negativeLookbehind()`

```ts
function negativeLookahead(
  sequence: RegexSequence
): NegativeLookahead
```

Regex syntax: `(?<!...)`.

Allows for matches to be rejected if a specified preceeding pattern is present, without consuming any characters.

## Quantifiers

Quantifiers in regex define the number of occurrences to match for a pattern.

### `zeroOrMore()`

```ts
function zeroOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean, // default=true
  }
): ZeroOrMore
```

Regex syntax:
* `x*` for default greedy behavior (match as many characters as possible)
* `x*?` for non-greedy behavior (match as few characters as possible)

The `zeroOrMore` quantifier matches zero or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### `oneOrMore()`

```ts
function oneOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean, // default=true
  }
): OneOrMore
```

Regex syntax:
* `x+` for default greedy behavior (match as many characters as possible)
* `x+?` for non-greedy behavior (match as few characters as possible)

The `oneOrMore` quantifier matches one or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### `optional()`

```ts
function optional(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean, // default=true
  }
): Optionally
```

Regex syntax:
* `x?` for default greedy behavior (match as many characters as possible)
* `x??` for non-greedy behavior (match as few characters as possible)

The `optional` quantifier matches zero or one occurrence of a given pattern, making it optional.

### `repeat()`

```ts
function repeat(
  sequence: RegexSequence,
  options: number | { 
    min: number;
    max?: number; 
    greedy?: boolean;  // default=true
  },
): Repeat
```

Regex syntax:
* `x{n}`, `x{min,}`, `x{min, max}` for default greedy behavior (match as many characters as possible)
* `x{min,}?`, `x{min, max}?` for non-greedy behavior (match as few characters as possible)

The `repeat` quantifier in regex matches either exactly `count` times or between `min` and `max` times. If only `min` is provided, it matches at least `min` times.

## Character classes

Character classes are a set of characters that match any one of the characters in the set.

### Common character classes

```ts
const any: CharacterClass;
const word: CharacterClass;
const notWord: CharacterClass;
const digit: CharacterClass;
const notDigit: CharacterClass;
const whitespace: CharacterClass;
const notWhitespace: CharacterClass;
```

- `any` matches any character except newline characters. Regex syntax: `*`.
- `word` matches any word character (letters, digits & underscore). Regex syntax: `\w`.
- `notWord` matches any character **except** word characters (letters, digits & underscore). Regex syntax: `\W`.
- `digit` matches any digit. Regex syntax: `\d`.
- `notDigit` matches any character **except** digits. Regex syntax: `\D`.
- `whitespace` matches any whitespace character (spaces, tabs, line breaks). Regex syntax: `\s`.
- `notWhitespace` matches any character **except** whitespace characters (spaces, tabs, line breaks). Regex syntax: `\S`.

### `anyOf()`

```ts
function anyOf(
  characters: string,
): CharacterClass
```

Regex syntax: `[abc]`.

The `anyOf` class matches any character in the `character` string.

Example: `anyOf('aeiou')` will match either `a`, `e`, `i` `o` or `u` characters.

### `charRange()`

```ts
function charRange(
  start: string,
  end: string,
): CharacterClass
```

Regex syntax: `[a-z]`.

The `charRange` class matches any characters in the range from `start` to `end` (inclusive).

Examples:

- `charRange('a', 'z')` will match all lowercase characters from `a` to `z`.
- `charRange('A', 'Z')` will match all uppercase characters from `A` to `Z`.
- `charRange('0', '9')` will match all digit characters from `0` to `9`.

### `charClass()`

```ts
function charClass(
  ...elements: CharacterClass[],
): CharacterClass
```

Regex syntax: `[...]`.

The `charClass` construct creates a new character class that includes all passed character classes.

Examples:

- `charClass(charRange('a', 'f'), digit)` will match all lowercase hex digits (`0` to `9` and `a` to `f`).
- `charClass(charRange('a', 'z'), digit, anyOf("._-"))` will match any digit, lowercase Latin letter from `a` to `z`, and either of `.`, `_`, and `-` characters.

### `inverted()`

```ts
function inverted(
  element: CharacterClass,
): CharacterClass
```

Regex syntax: `[^...]`.

The `inverted` construct creates a new character class that matches any character not present in the passed character class.

Examples:

- `inverted(digit)` matches any character that is not a digit
- `inverted(anyOf('aeiou'))` matches any character that is not a lowercase vowel.

## Anchors

Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters.

### Start and end of string

```ts
const startOfString: Anchor;
const endOfString: Anchor;
```

- `startOfString` anchor matches the start of a string (or line, if multiline mode is enabled). Regex syntax: `^`.
- `endOfString` anchor matches the end of a string (or line, if multiline mode is enabled). Regex syntax: `$`.
