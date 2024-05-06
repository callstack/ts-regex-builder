---
id: types
title: Types
---

### `RegexSequence`

```ts
type RegexSequence = RegexElement[] | RegexElement;
```

The sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

### `RegexElement`

```ts
type RegexElement = EncodedRegex | CharacterClass | RegExp | string;
```

Regex elements are fundamental building blocks of a regular expression. These can be either further regex constructs, regular strings to be matched literally or `RegExp` literals (`/.../`) for including simple regexes as part of a larger structure.

### `EncodedRegex`

TODO

Note: the shape of the `EncodedRegex` is considered private and may change in a breaking way without a major release. We will focus on maintaining the compatibility of regexes built with

### `CharacterClass`

TODO

Note: the shape of the `CharacterClass` is considered private and may change in a breaking way without a major release. We will focus on maintaining the compatibility of regexes built with
