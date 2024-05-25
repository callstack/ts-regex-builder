# `charRange()`

```ts
function charRange(start: string, end: string): CharacterClass;
```

Regex syntax: `[a-z]`.

The `charRange` class matches any characters in the range from `start` to `end` (inclusive).

Examples:

- `charRange('a', 'z')` will match all lowercase characters from `a` to `z`.
- `charRange('A', 'Z')` will match all uppercase characters from `A` to `Z`.
- `charRange('0', '9')` will match all digit characters from `0` to `9`.
