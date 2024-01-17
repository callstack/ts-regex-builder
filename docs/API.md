# API

## Builder

### `buildRegExp()` function

```ts
function buildRegExp(sequence: RegexSequence): RegExp;

function buildRegExp(
    sequence: RegexSequence,
    flags: {
        global?: boolean;
        ignoreCase?: boolean;
        multiline?: boolean;
        hasIndices?: boolean;
        sticky?: boolean;
    },
): RegExp;
```

## Constructs

### `capture()`

Captures, also known as capturing groups, are used to extract and store parts of the matched string for later use. 

```ts
function capture(
    sequence: RegexSequence
): Capture
```

### `choiceOf()`

```ts
function choiceOf(
    ...alternatives: RegexSequence[]
): ChoiceOf {
```

The `choiceOf` (alternation) construct is used to match one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

Example: `choiceOf("color", "colour")` matches either `color` or `colour` pattern.

## Quantifiers

### `zeroOrMore()`

```ts
function zeroOrMore(
    sequence: RegexSequence,
): ZeroOrMore
```

### `oneOrMore()`

```ts
function oneOrMore(
    sequence: RegexSequence,
): OneOrMore
```

### `optionally()`

```ts
function optionally(
    sequence: RegexSequence,
): Optionally
```

### `repeat()`

```ts
function repeat(
    options: number | { min: number; max?: number },
    sequence: RegexSequence,
): Repeat
```

## Character classes

Character classes are a set of characters that match any one of the characters in the set. 

### Common character classess

```ts
const any: CharacterClass;
const word: CharacterClass;
const digit: CharacterClass;
const whitespace: CharacterClass;
```

* `any` matches any character except newline characters.
* `word` matches any word character (alphanumeric & underscore).
* `digit` matches any digit.
* `whitespace` matches any whitespace character (spaces, tabs, line breaks).

### `anyOf()`

```ts
function anyOf(
    characters: string,
): CharacterClass
```

The `anyOf` class matches any character present in the `character` string.

Example: `anyOf('aeiou')` will match either `a`, `e`, `i` `o` or `u` characters.

### `characterRange()`

```ts
function characterRange(
    start: string,
    end: string,
): CharacterClass
```

The `characterRange` class matches any character present in the range from `start` to `end` (inclusive).

Examples:
* `characterRange('a', 'z')` will match all lowercase characters from `a` to `z`.
* `characterRange('A', 'Z')` will match all uppercase characters from `a` to `z`.
* `characterRange('0', '9')` will match all digit characters from `0` to `9`.

### `characterClass()`

```ts
function characterClass(
    ...elements: CharacterClass[],
): CharacterClass
```

The `characterClass` construct creates a new character class that includes all passed character classes.

Example:
* `characterClass(characterRange('a', 'f'), digit)` will match all lowercase hex digits (`0` to `9` and `a` to `f`).
* `characterClass(characterRange('a', 'z'), digit, anyOf("._-"))` will match any digit, lowercase latin lettet from `a` to `z`, and either of `.`, `_`, and `-` characters.

### `inverted()`

```ts
function inverted(
    element: CharacterClass,
): CharacterClass
```

The `inverted` construct creates a new character class that matches any character that is not present in the passed character class.

Examples:
* `inverted(digit)` matches any character that is not a digit
* `inverted(anyOf('aeiou'))` matches any character that is not a lowercase vowel.



## Anchors

Anchors are special characters or sequences that specify positions in the input string, rather than matching specific characters.

### Line start and end

```ts
const startOfString: Anchor; // Regex: ^
const endOfString: Anchor; // Regex: $
```

The `startOfString` (regex: `^`) matches the start of a string (or line, if multiline mode is enabled).

The `endOfString` (regex: `$`)  matches the end of a string (or line, if multiline mode is enabled).