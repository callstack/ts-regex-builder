# `anyOf()`

```ts
function anyOf(characters: string): CharacterClass;
```

Regex syntax: `[abc]`.

The `anyOf` class matches any character in the `character` string.

Example: `anyOf('aeiou')` will match either `a`, `e`, `i` `o` or `u` characters.

