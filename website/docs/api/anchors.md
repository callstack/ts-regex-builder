---
id: anchors
title: Anchors
sidebar_position: 6
---

Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters.

### Start and end of string

```ts
const startOfString: Anchor;
const endOfString: Anchor;
```

- `startOfString` anchor matches the start of a string (or line, if multiline mode is enabled). Regex syntax: `^`.
- `endOfString` anchor matches the end of a string (or line, if multiline mode is enabled). Regex syntax: `$`.

### Word boundary

```ts
const wordBoundary: Anchor;
const notWordBoundary: Anchor;
```

- `wordBoundary` matches the positions where a word character is not followed or preceded by another word character, effectively indicating the start or end of a word. Regex syntax: `\b`.
- `notWordBoundary` matches the positions where a word character is followed or preceded by another word character, indicating that it is not at the start or end of a word. Regex syntax: `\B`.

Note: word characters are letters, digits, and underscore (`_`). Other special characters like `#`, `$`, etc are not considered word characters.
