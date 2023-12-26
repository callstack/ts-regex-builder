# API

## Overview

TS Regex Builder allows building readable regular expressions objects using easy-to-read domain-specific language (DSL).

```ts
// Same as: const regex = /Hello (\w+)/
const regex = buildRegex(['Hello ', capture(oneOrMore(word))]);
```

This library exposes numerous regex components (e.g., `capture`, `oneOrMore`) corresponding to regular expression constructs. Components, when called, return `RegexElement` instances. You can form regular expressions by creating a sequence of elements and strings using JavaScript array literals:

```ts
const elements = ['Hello ', capture(oneOrMore(word))];
```

We refer to `RegexElement | string` type for brevity as `RegexNode`. Most of the regex components accept either a single regex node or an array of regex nodes:

```ts
oneOrMore('a'); // Single string node
oneOrMore(anyOf('xyz')); // Single anyOf element
oneOrMore(['a', anyOf('xyz')]); // Array of regex elements and strings
```

| Regex Component                    | Regex construct | Notes                                        |
| ---------------------------------- | --------------- | -------------------------------------------- |
| `buildRegex(...)`                  | `/.../`         | Create `RegExp`` object                      |
| `anyOf('abc')`                     | `[abc]`         | Specify matching characters                  |
| `characterRange('a', 'z')`         | `[a-z]`         | Specify range of matching characters         |
| `capture(x)`                       | `(x)`           | Capture group                                |
| `word`                             | `\w`            |
| `digit`                            | `\d`            |
| `any`                              | `.`             |
| `whitespace`                       | `\s`            |
| `startOfString`                    | `^`             | Start of string (or line in multiline mode)  |
| `endOfString`                      | `$`             | End of string (or line in multiline mode)    |
| `inverted(...)`                    | `[^...]`        | Inverts character class                      |
| `characterClass(...)`              | `[...]`         | Construct concatenation of character classes |
| `choiceOf(x, y, z)`                | `x\|y\|z`       | Alternative                                  |
| `zeroOrMore(x)`                    | `x*`            |                                              |
| `oneOrMore(x)`                     | `x+`            |                                              |
| `optionally(x)`                    | `x?`            |                                              |
| `repeat({ count: n }, ...)`        | `...{n}`        | Repeat exact number of times                 |
| `repeat({ min: n, }, ...)`         | `...{n,}`       | Repeat at least given number of times        |
| `repeat({ min: n, max: n2 }, ...)` | `...{n1,n2}`    | Repeat number of times in a range            |

## Types

```ts
import type { EncodeOutput } from './encoder/types';

export type RegexNode = RegexElement | string;

export interface RegexElement {
  type: string;
  encode(): EncodeOutput;
}
```

## `buildRegex`

```ts
function buildRegex(elements: RegexNode | RegexNode[]): RegExp;
function buildRegex(
  flags: {
    global?: boolean; // Global search
    ignoreCase?: boolean; // Case-insensitive search
    multiline?: boolean; // Allows ^ and $ to match newline characters.
    hasIndices?: boolean; // Generate indices for substring matches.
    sticky?: boolean; // Perform a "sticky" search that matches starting at the current position in the target string.
  },
  elements: RegexNode | RegexNode[]
): RegExp;
```

Parameters:

- `elements` - single regex element or string or array of such elements
- `flags` - flags for used for construction of `RegExp` object

The top-level method for TS Regex Builder is `buildRegex`; it accepts either a single regex element, a string, or an array of such.

## Character classes

Te

###
