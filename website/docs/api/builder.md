---
id: builder
title: Builder
---

### `buildRegExp()`

```ts
function buildRegExp(
  sequence: RegexSequence,
  flags?: {
    global?: boolean;
    ignoreCase?: boolean;
    multiline?: boolean;
    hasIndices?: boolean;
  },
): RegExp;
```

The `buildRegExp` is a top-level function responsible for building a JavaScript-native `RegExp` object from passed regex sequence.

It optionally accepts a list of regex flags:

- `global` - find all matches in a string instead of just the first one.
- `ignoreCase` - perform case-insensitive matching.
- `multiline` - treat the start and end of each line in a string as the beginning and end of the string.
- `hasIndices` - provide each captured group's start and end indices in a match.
