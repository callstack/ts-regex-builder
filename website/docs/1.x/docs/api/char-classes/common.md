# Common character classes

```ts
const any: CharacterClass;
const word: CharacterClass;
const nonWord: CharacterClass;
const digit: CharacterClass;
const nonDigit: CharacterClass;
const whitespace: CharacterClass;
const nonWhitespace: CharacterClass;
```

Character classes are a set of characters that match any one of the characters in the set.

- `any` matches any character except newline characters. Regex syntax: `*`.
- `word` matches any word character (letters, digits & underscore). Regex syntax: `\w`.
- `nonWord` matches any character **except** word characters (letters, digits & underscore). Regex syntax: `\W`.
- `digit` matches any digit. Regex syntax: `\d`.
- `nonDigit` matches any character **except** digits. Regex syntax: `\D`.
- `whitespace` matches any whitespace character (spaces, tabs, line breaks). Regex syntax: `\s`.
- `nonWhitespace` matches any character **except** whitespace characters (spaces, tabs, line breaks). Regex syntax: `\S`.

