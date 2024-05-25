# `charClass()`

```ts
function charClass(...elements: CharacterClass[]): CharacterClass;
```

Regex syntax: `[...]`.

The `charClass` construct creates a new character class that includes all passed character classes.

Examples:

- `charClass(charRange('a', 'f'), digit)` will match all lowercase hex digits (`0` to `9` and `a` to `f`).
- `charClass(charRange('a', 'z'), digit, anyOf("._-"))` will match any digit, lowercase Latin letter from `a` to `z`, and either of `.`, `_`, and `-` characters.

