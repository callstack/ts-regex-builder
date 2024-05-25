# `ref()`

```ts
function ref(name: string): Reference;
```

Creates a reference, also known as a backreference, which allows matching again the exact text that a capturing group previously matched. The reference must use the same name as some capturing group earlier in the expression to form a valid regex.


### Regex syntax
`\k<...>`

### Example

Usage with `capture()`:

```ts
const regex = buildRegExp([
  // Create a named capture using name from `someKey`.
  capture(..., { name: 'someKey' }),
  // ... some other elements ...

  // Match the same text as matched by `capture` with the same name.
  ref('someKey'),
  ])
```

:::note

TS Regex Builder doesn't support using ordinal backreferences (`\1`, `\2`, etc) because in complex regex patterns, these references are difficult to accurately use.

:::
