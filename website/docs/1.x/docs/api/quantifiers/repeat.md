# `repeat()`

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
): Repeat;
```

The `repeat` quantifier in regex matches either exactly `count` times or between `min` and `max` times. If only `min` is provided, it matches at least `min` times.

### Regex syntax

- `x{n}`, `x{min,}`, `x{min, max}` for default greedy behavior (match as many characters as possible)
- `x{min,}?`, `x{min, max}?` for non-greedy behavior (match as few characters as possible)

### Examples

```ts
// Repeat exactly 3 times.
repeat([...], 3);

// Repeat at least 2 times (greedy by default).
repeat([...], { min: 2});

// Repeat between 3 and 5 times  (greedy by default).
repeat([...], { min: 3, max: 5});

// Repeat with non-greedy (reluctant) bejavior
repeat([...], { min: 0, max: 3, greedy: false });
```