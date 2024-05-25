# `capture()`

```ts
function capture(
  sequence: RegexSequence,
  options?: {
    name?: string;
  },
): Capture;
```

Captures, also known as capturing groups, extract and store parts of the matched string for later use.

Capture results are available using array-like [`match()` result object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_match).

### Named groups

When using `name` options, the group becomes a [named capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) allowing to refer to it using name instead of index.

Named capture results are available using [`groups`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_named_capturing_groups) property on `match()` result.

### Regex syntax

- `(...)` for capturing groups (no `name` option)
- `(?<name>...)` for named capturing groups (`name` option)

:::note

TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required, e.g., `zeroOrMore("abc")` is encoded as `(?:abc)+`.

:::

