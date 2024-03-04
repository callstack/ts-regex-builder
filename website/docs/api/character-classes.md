---
id: character-classes
title: Character Classes
---

Character classes are a set of characters that match any one of the characters in the set.

### Common character classes

```ts
const any: CharacterClass;
const word: CharacterClass;
const nonWord: CharacterClass;
const digit: CharacterClass;
const nonDigit: CharacterClass;
const whitespace: CharacterClass;
const nonWhitespace: CharacterClass;
```

- `any` matches any character except newline characters. Regex syntax: `*`.
- `word` matches any word character (letters, digits & underscore). Regex syntax: `\w`.
- `nonWord` matches any character **except** word characters (letters, digits & underscore). Regex syntax: `\W`.
- `digit` matches any digit. Regex syntax: `\d`.
- `nonDigit` matches any character **except** digits. Regex syntax: `\D`.
- `whitespace` matches any whitespace character (spaces, tabs, line breaks). Regex syntax: `\s`.
- `nonWhitespace` matches any character **except** whitespace characters (spaces, tabs, line breaks). Regex syntax: `\S`.

### `anyOf()`

```ts
function anyOf(characters: string): CharacterClass;
```

Regex syntax: `[abc]`.

The `anyOf` class matches any character in the `character` string.

Example: `anyOf('aeiou')` will match either `a`, `e`, `i` `o` or `u` characters.

### `charRange()`

```ts
function charRange(start: string, end: string): CharacterClass;
```

Regex syntax: `[a-z]`.

The `charRange` class matches any characters in the range from `start` to `end` (inclusive).

Examples:

- `charRange('a', 'z')` will match all lowercase characters from `a` to `z`.
- `charRange('A', 'Z')` will match all uppercase characters from `A` to `Z`.
- `charRange('0', '9')` will match all digit characters from `0` to `9`.

### `charClass()`

```ts
function charClass(...elements: CharacterClass[]): CharacterClass;
```

Regex syntax: `[...]`.

The `charClass` construct creates a new character class that includes all passed character classes.

Examples:

- `charClass(charRange('a', 'f'), digit)` will match all lowercase hex digits (`0` to `9` and `a` to `f`).
- `charClass(charRange('a', 'z'), digit, anyOf("._-"))` will match any digit, lowercase Latin letter from `a` to `z`, and either of `.`, `_`, and `-` characters.

### `inverted()`

```ts
function inverted(element: CharacterClass): CharacterClass;
```

Regex syntax: `[^...]`.

The `inverted` construct creates a new character class that matches any character not present in the passed character class.

Examples:

- `inverted(digit)` matches any character that is not a digit
- `inverted(anyOf('aeiou'))` matches any character that is not a lowercase vowel.
