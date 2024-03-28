---
id: captures
title: Captures
---

### `capture()`

```ts
function capture(
  sequence: RegexSequence,
  options?: {
    name?: string;
  },
): Capture;
```

Regex syntax:

- `(...)` for capturing groups (no `name` option)
- `(?<name>...)` for named capturing groups (`name` option)

Captures, also known as capturing groups, extract and store parts of the matched string for later use.

Capture results are available using array-like [`match()` result object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_match).

#### Named groups

When using `name` options, the group becomes a [named capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) allowing to refer to it using name instead of index.

Named capture results are available using [`groups`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_named_capturing_groups) property on `match()` result.

:::note

TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required. E.g., `zeroOrMore("abc")` is encoded as `(?:abc)+`.

:::

### `Capture.ref()`

```ts
function Capture.ref(): Backreference;
```

Regex syntax: `\k<...>`.

Creates a backreference, allowing the exact text, previously matched by a capturing group, to be matched again. This construct is not a standalone function but a method available on a `Capture` construct instance, which should be assigned to a variable.

Usage with `capture()`:

```ts
// Define a capture as a variable.
const someCapture = capture([...], { name: 'some' });

const regex = buildRegExp([
  // Create a named capture using name from `someRef`.
  someCapture,
  // ... some other elements ...
  // Match the same text as captured in a `capture` using `someRef`.
  someCapture.ref(),
])
```

:::note

TS Regex Builder doesn't support using ordinal backreferences (`\1`, `\2`, etc) because in complex regex patterns, these references are difficult to accurately use.

:::
