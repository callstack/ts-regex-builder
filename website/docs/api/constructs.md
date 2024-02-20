---
id: constructs
title: Constructs
---

These functions and objects represent available regex constructs.

### `choiceOf()`

```ts
function choiceOf(
  ...alternatives: RegexSequence[],
): ChoiceOf {
```

Regex syntax: `a|b|c`.

The `choiceOf` (disjunction) construct matches one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

Example: `choiceOf("color", "colour")` matches either `color` or `colour` pattern.
