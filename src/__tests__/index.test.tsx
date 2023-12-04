type RegexComponent = string | RegexQuantifier;

type RegexQuantifier = OneOrMore | Optionally;

type OneOrMore = {
  type: 'oneOrMore';
  children: RegexComponent[];
};

function oneOrMore(...children: RegexComponent[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
  };
}

type Optionally = {
  type: 'optionally';
  children: RegexComponent[];
};

function optionally(...children: RegexComponent[]): Optionally {
  return {
    type: 'optionally',
    children,
  };
}

function compile(...children: RegexComponent[]): string {
  return children.map((c) => compileSingle(c)).join('');
}

function compileSingle(component: RegexComponent): string {
  if (typeof component === 'string') {
    return component;
  }

  const { type, children } = component;
  if (type === 'oneOrMore') {
    return `${wrapGroup(compile(...children))}+`;
  }

  if (type === 'optionally') {
    return `${wrapGroup(compile(...children))}?`;
  }

  throw new Error(`Unknown component ${component}`);
}

function wrapGroup(input: string): string {
  return input.length === 1 ? input : `(${input})`;
}

function regex(...children: RegexComponent[]): RegExp {
  const pattern = compile(...children);
  return new RegExp(pattern);
}

test('basic quantifies', () => {
  expect(compile('a')).toEqual('a');
  expect(compile('a', 'b')).toEqual('ab');

  expect(compile(oneOrMore('a'))).toEqual('a+');
  expect(compile(optionally('a'))).toEqual('a?');

  expect(compile('a', oneOrMore('b'))).toEqual('ab+');
  expect(compile('a', oneOrMore('bc'))).toEqual('a(bc)+');
  expect(compile('a', oneOrMore('bc'))).toEqual('a(bc)+');

  expect(compile(optionally('a'), 'b')).toEqual('a?b');
});

test('regex constructor', () => {
  expect(regex('a').test('a')).toBeTruthy();
  expect(regex('a').test('b')).toBeFalsy();
});
