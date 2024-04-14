## Current syntax comparison

The following section compares the current TS Regex Builder syntax with Swift Regex Builder one.

## Swift Regex Builder

```swift
let wordSegment = OneOrMore(.word)
let emailPattern = Regex {
  Capture {
    ZeroOrMore {
      wordSegment
      "."
    }
    wordSegment
  }
  "@"
  Capture {
    wordSegment
    OneOrMore {
      "."
      wordSegment
    }
  }
}
```

## TS Regex Builder

Formatted similar Swift Regex Builder
```ts
const wordSegment = oneOrMore(word);
const emailRegex = buildRegExp([
  capture([
    zeroOrMore([
      wordSegment,
      '.'
    ]),
  ]),
  '@',
  capture([
    wordSegment,
    oneOrMore([
      '.',
      wordSegments,
    ])
  ])
])
```

Formatted with prettier:
```ts
const wordSegment = oneOrMore(word);
const emailRegex = buildRegExp([
  capture([zeroOrMore([wordSegment, '.'])], wordSegment),
  '@',
  capture([wordSegment, oneOrMore(['.', wordSegments])]),
]);
```


Formatted to the taste:
```ts
const wordSegment = oneOrMore(word);
const emailRegex = buildRegExp([
  capture([
    zeroOrMore([wordSegment, '.']), //
    wordSegment,
  ]),
  '@',
  capture([
    wordSegment,
    oneOrMore(['.', wordSegments]), //
  ]),
]);
```

## Alternative hypothetical syntaxes

This section contains hypothetical alternative syntax ideas what do not currently work but could be implemented if seen as more benefitial for the developer exeperience (DX).

Uppercase components
```ts
const wordSegment = OneOrMore(Word);
const emailRegex = Regex([
  Capture([
    ZeroOrMore([wordSegment, '.']), //
    wordSegment,
  ]),
  '@',
  Capture([
    wordSegment,
    OneOrMore(['.', wordSegments]), //
  ]),
]).build();
```

Callback-like bodies:
```ts
const wordSegment = oneOrMore(word);
const emailRegex = buildRegExp(() => {
  capture(() => {
    zeroOrMore([wordSegment, '.']);
    regex(wordSegment);
  }),
  '@',
  capture(() => {
    regex(wordSegment);
    oneOrMore(() => {
        '.'
        wordSegments
    });
  }),
});
```


JSX-like syntax:
```jsx
const wordSegment = (
  <OneOrMore>
    <Word />
  </OneOrMore>
);

const emailRegex = (
  <Regex>
    <Capture>
      <ZeroOrMore>{wordSegment}.</ZeroOrMore>
      {wordSegment}
    </Capture>
    @
    <Capture>
      {wordSegment}
      <OneOrMore>.{wordSegment}</OneOrMore>
    </Capture>
  </Regex>
);
```