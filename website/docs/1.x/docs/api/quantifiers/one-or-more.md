# `oneOrMore()`

```ts
function oneOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): OneOrMore;
```

The `oneOrMore` quantifier matches one or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### Regex syntax

- `x+` for default greedy behavior (match as many characters as possible)
- `x+?` for non-greedy behavior (match as few characters as possible)

### Examples

```ts
// Matches one or more 'a'
oneOrMore('a')

// Matches one or more 'a' with a non-greedy (reluctatant) behavior
oneOrMore('a', { greedy: false })
```