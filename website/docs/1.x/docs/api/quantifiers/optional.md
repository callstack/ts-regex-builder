# `optional()`

```ts
function optional(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): Optionally;
```

The `optional` quantifier matches zero or one occurrence of a given pattern, making it optional.

### Regex syntax

- `x?` for default greedy behavior (match as many characters as possible)
- `x??` for non-greedy behavior (match as few characters as possible)

### Examples

```ts
// Optionally matches 'a'
optional('a')

// Optionally matches 'a' with a non-greedy (reluctatant) behavior
optional('a', { greedy: false })
```