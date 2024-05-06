import type { CharacterClass, EncodedRegex, RegexElement, RegexSequence } from './types';
import { ensureArray } from './utils/elements';
import { escapeText } from './utils/text';

export function encodeSequence(sequence: RegexSequence): EncodedRegex {
  const elements = ensureArray(sequence);
  const encodedNodes = elements.map((n) => encodeNode(n));
  return concatEncodedRegexes(encodedNodes);
}

export function encodeAtom(sequence: RegexSequence): EncodedRegex {
  return wrapAtom(encodeSequence(sequence));
}

function encodeNode(element: RegexElement): EncodedRegex {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (typeof element === 'object' && element instanceof RegExp) {
    return encodeRegExp(element);
  }

  if (typeof element === 'object' && 'pattern' in element) {
    return element;
  }

  if (typeof element === 'object' && 'chars' in element) {
    return encodeCharClass(element);
  }

  throw new Error(`\`encodeNode\`: unknown element: ${JSON.stringify(element, null, 2)}`);
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

function concatEncodedRegexes(encoded: EncodedRegex[]): EncodedRegex {
  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: encoded
      .map((n) => (n.precedence === 'disjunction' ? wrapAtom(n) : n).pattern)
      .join(''),
  };
}

function wrapAtom(encoded: EncodedRegex): EncodedRegex {
  if (encoded.precedence === 'atom') {
    return encoded;
  }

  return {
    precedence: 'atom',
    pattern: `(?:${encoded.pattern})`,
  };
}
