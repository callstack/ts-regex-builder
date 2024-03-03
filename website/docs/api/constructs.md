---
id: constructs
title: Constructs
sidebar_position: 3
---

These functions and objects represent available regex constructs.

### `choiceOf()`

```ts
function choiceOf(
  ...alternatives: RegexSequence[]
): ChoiceOf {
```

Regex syntax: `a|b|c`.

The `choiceOf` (disjunction) construct matches one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

Example: `choiceOf("color", "colour")` matches either `color` or `colour` pattern.

### `capture()`

```ts
function capture(sequence: RegexSequence): Capture;
```

Regex syntax: `(...)`.

Captures, also known as capturing groups, extract and store parts of the matched string for later use.

> [!NOTE]
> TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required. E.g., `zeroOrMore(["abc"])` is encoded as `(?:abc)+`.

