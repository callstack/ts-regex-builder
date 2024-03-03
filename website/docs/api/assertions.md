---
id: anchors
title: Assertions
sidebar_position: 6
---

## Anchors

Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters.

### Start and end of string

```ts
const startOfString: Anchor;
const endOfString: Anchor;
```

- `startOfString` anchor matches the start of a string (or line, if multiline mode is enabled). Regex syntax: `^`.
- `endOfString` anchor matches the end of a string (or line, if multiline mode is enabled). Regex syntax: `$`.

### Word boundary

_This API was added in version 1.3.0._

```ts
const wordBoundary: Anchor;
const notWordBoundary: Anchor;
```

- `wordBoundary` matches the positions where a word character is not followed or preceded by another word character, effectively indicating the start or end of a word. Regex syntax: `\b`.
- `notWordBoundary` matches the positions where a word character is followed or preceded by another word character, indicating that it is not at the start or end of a word. Regex syntax: `\B`.

Note: word characters are letters, digits, and underscore (`_`). Other special characters like `#`, `$`, etc are not considered word characters.

## Lookarounds

Lookarounds in regex are used for asserting that some pattern is or isn't followed or preceded by another pattern, without including the latter in the match.

### `lookahead()`

_This API was added in version 1.3.0._

```ts
function lookahead(sequence: RegexSequence): Lookahead;
```

Regex syntax: `(?=...)`.

Allows for conditional matching by checking for subsequent patterns in regexes without consuming them.

### `negativeLookahead()`

_This API was added in version 1.3.0._

```ts
function negativeLookahead(sequence: RegexSequence): NegativeLookahead;
```

Regex syntax: `(?!...)`.

Allows for matches to be rejected if a specified subsequent pattern is present, without consuming any characters.

### `lookbehind()`

_This API was added in version 1.3.0._

```ts
function lookbehind(sequence: RegexSequence): Lookahead;
```

Regex syntax: `(?<=...)`.

Allows for conditional matching by checking for preceeding patterns in regexes without consuming them.

### `negativeLookbehind()`

_This API was added in version 1.3.0._

```ts
function negativeLookahead(sequence: RegexSequence): NegativeLookahead;
```

Regex syntax: `(?<!...)`.

Allows for matches to be rejected if a specified preceeding pattern is present, without consuming any characters.
