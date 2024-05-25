---
id: quantifiers
title: Quantifiers
---

Quantifiers in regex define the number of occurrences to match for a pattern.

### `zeroOrMore()`

```ts
function zeroOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): RegexConstruct;
```

Regex syntax:

- `x*` for default greedy behavior (match as many characters as possible)
- `x*?` for non-greedy behavior (match as few characters as possible)

The `zeroOrMore` quantifier matches zero or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### `oneOrMore()`

```ts
function oneOrMore(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): RegexConstruct;
```

Regex syntax:

- `x+` for default greedy behavior (match as many characters as possible)
- `x+?` for non-greedy behavior (match as few characters as possible)

The `oneOrMore` quantifier matches one or more occurrences of a given pattern, allowing a flexible number of repetitions of that element.

### `optional()`

```ts
function optional(
  sequence: RegexSequence,
  options?: {
    greedy?: boolean; // default=true
  },
): RegexConstruct;
```

Regex syntax:

- `x?` for default greedy behavior (match as many characters as possible)
- `x??` for non-greedy behavior (match as few characters as possible)

The `optional` quantifier matches zero or one occurrence of a given pattern, making it optional.

### `repeat()`

```ts
function repeat(
  sequence: RegexSequence,
  options:
    | number
    | {
        min: number;
        max?: number;
        greedy?: boolean; // default=true
      },
): RegexConstruct;
```

Regex syntax:

- `x{n}`, `x{min,}`, `x{min, max}` for default greedy behavior (match as many characters as possible)
- `x{min,}?`, `x{min, max}?` for non-greedy behavior (match as few characters as possible)

The `repeat` quantifier in regex matches either exactly `count` times or between `min` and `max` times. If only `min` is provided, it matches at least `min` times.
