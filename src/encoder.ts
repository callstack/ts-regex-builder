import type { CharacterClass, EncodedRegex, RegexElement, RegexSequence } from './types';

export function encodeAtomic(sequence: RegexSequence): string {
  const encoded = encodeSequence(sequence);
  return encoded.precedence === 'atom' ? encoded.pattern : `(?:${encoded.pattern})`;
}

export function encodeSequence(sequence: RegexSequence): EncodedRegex {
  const elements = Array.isArray(sequence) ? sequence : [sequence];
  const encoded = elements.map((n) => encodeElement(n));

  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: encoded
      .map((n) => (n.precedence === 'disjunction' ? encodeAtomic(n) : n.pattern))
      .join(''),
  };
}

function encodeElement(element: RegexElement): EncodedRegex {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (typeof element === 'object' && element instanceof RegExp) {
    return encodeRegExp(element);
  }

  // EncodedRegex
  if (typeof element === 'object' && 'pattern' in element) {
    return element;
  }

  // CharacterClass
  if (typeof element === 'object' && 'chars' in element) {
    return encodeCharClass(element);
  }

  throw new Error(`\`encodeElement\`: unknown element: ${JSON.stringify(element, null, 2)}`);
}

function encodeText(text: string): EncodedRegex {
  if (text.length === 0) {
    throw new Error('`encodeText`: received text should not be empty');
  }

  // Optimize for single character case
  if (text.length === 1) {
    return {
      precedence: 'atom',
      pattern: escapeText(text),
    };
  }

  return {
    precedence: 'sequence',
    pattern: escapeText(text),
  };
}

function encodeRegExp(regexp: RegExp): EncodedRegex {
  const pattern = regexp.source;

  // Encode at safe precedence
  return {
    precedence: isAtomicPattern(pattern) ? 'atom' : 'disjunction',
    pattern,
  };
}

export function encodeCharClass(element: CharacterClass, isNegated?: boolean): EncodedRegex {
  if (!element.chars.length && !element.ranges?.length) {
    throw new Error('Character class should contain at least one character or character range');
  }

  // If passed characters includes hyphen (`-`) it need to be moved to
  // first (or last) place in order to treat it as hyphen character and not a range.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
  const hyphen = element.chars.includes('-') ? '-' : '';
  const caret = element.chars.includes('^') ? '^' : '';
  const otherChars = element.chars.filter((c) => c !== '-' && c !== '^').join('');
  const ranges = element.ranges?.map(({ start, end }) => `${start}-${end}`).join('') ?? '';
  const negation = isNegated ? '^' : '';

  let pattern = `[${negation}${ranges}${otherChars}${caret}${hyphen}]`;
  if (pattern === '[^-]') pattern = '[\\^-]';

  return {
    precedence: 'atom',
    pattern,
  };
}

// This is intended to catch only some popular atomic patterns like char classes.
function isAtomicPattern(pattern: string): boolean {
  if (pattern.length === 1) {
    return true;
  }

  if (pattern.startsWith('[') && pattern.endsWith(']') && pattern.match(/[[\]]/g)?.length === 2) {
    return true;
  }

  if (pattern.startsWith('(') && pattern.endsWith(')') && pattern.match(/[()]/g)?.length === 2) {
    return true;
  }

  return false;
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
