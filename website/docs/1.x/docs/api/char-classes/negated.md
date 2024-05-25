# `negated()`

```ts
function negated(element: CharacterClass): CharacterClass;
```

The `negated` construct creates a new character class that matches any character not present in the passed character class.

### Regex syntax
`[^...]`

### Examples
- `negated(digit)` matches any character that is not a digit
- `negated(anyOf('aeiou'))` matches any character that is not a lowercase vowel
