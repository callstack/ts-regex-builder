# `zeroOrMore()`

```ts
function zeroOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): ZeroOrMore;
```

The `zeroOrMore` quantifier matches zero or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### Regex syntax

- `x*` for default greedy behavior (match as many characters as possible)
- `x*?` for non-greedy behavior (match as few characters as possible)

### Examples

```ts
// Matches zero or more 'a'
zeroOrMore('a')

// Matches zero or more 'a' with a non-greedy (reluctatant) behavior
zeroOrMore('a', { greedy: false })
```