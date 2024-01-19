# Project Guidelines

## Core principles

1. We strive to create an API that is easy & intuitive to use, helps users avoid making mistakes, and exposes 95%+ power of regular expressions.
2. We strive to balance replicating the [Swift Regex Builder API](https://developer.apple.com/documentation/regexbuilder) and creating an API native to TypeScript/JavaScript users.
3. We should adjust our API where there are discrepancies between Swift and JavaScript regex behavior.

## Implementation guidelines

1. When the user passes the text to any regex construct, it should be treated as an exact string to match and not as a regex string. We might provide an escape hatch for providing raw regex string through, but the user should use it explicitly.
