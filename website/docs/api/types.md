---
id: types
title: Types
sidebar_position: 1
---

### `RegexSequence`

The sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

### `RegexElement`

Fundamental building blocks of a regular expression, defined as either a regex construct, a string, or a `RegExp` literal (`/.../`).

### `RegexConstruct`

The common type for all regex constructs like character classes, quantifiers, and anchors. You should not need to use this type directly, it is returned by all regex construct functions.

Note: the shape of the `RegexConstruct` is considered private and may change in a breaking way without a major release. We will focus on maintaining the compatibility of regexes built with
