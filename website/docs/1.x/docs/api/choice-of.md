# `choiceOf()`

```ts
function choiceOf(
  ...alternatives: RegexSequence[],
): ChoiceOf {
```

The `choiceOf` (disjunction) construct matches one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

### Regex syntax
`a|b|c`

### Example

`choiceOf("color", "colour")` matches either `color` or `colour` pattern.
