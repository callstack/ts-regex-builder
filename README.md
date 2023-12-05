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

[Original API docs](https://developer.apple.com/documentation/regexbuilder)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
