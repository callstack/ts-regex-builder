# TS Regex

TypeScript adaptation of Swift Regex Builder API.

## Installation

```sh
npm install ts-regex
```

## Usage

```js
import { buildRegex, oneOrMore } from 'ts-regex';

// /(Hello)+ World/
const regex = buildRegex(oneOrMore('Hello '), 'World');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Reference

- [Swift Regex Builder API docs](https://developer.apple.com/documentation/regexbuilder)
- [Swift Evolution 351: Regex Builder DSL](https://github.com/apple/swift-evolution/blob/main/proposals/0351-regex-builder.md)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
