import type { CharacterClass, EncodedRegex, RegexElement, RegexSequence } from './types';

export function encode(sequence: RegexSequence): EncodedRegex {
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

export function encodeAtomic(sequence: RegexSequence): string {
  const encoded = encode(sequence);
  return encoded.precedence === 'atom' ? encoded.pattern : `(?:${encoded.pattern})`;
}

function encodeElement(element: RegexElement): EncodedRegex {
  if (typeof element === 'string' && element.length > 0) {
    return encodeText(element);
  }

  if (typeof element === 'object') {
    if (element instanceof RegExp) {
      return encodeRegExp(element);
    }

    // EncodedRegex
    if ('pattern' in element) {
      return element;
    }

    // SelfEncodableRegex
    if ('encode' in element) {
      return element.encode();
    }
  }

  throw new Error(`Unsupported element. Received: ${JSON.stringify(element, null, 2)}`);
}

function encodeText(text: string): EncodedRegex {
  return {
    // Optimize for single character case
    precedence: text.length === 1 ? 'atom' : 'sequence',
    pattern: escapeText(text),
  };
}

function encodeRegExp(regexp: RegExp): EncodedRegex {
  const pattern = regexp.source;

  return {
    // Encode at safe precedence
    precedence: isAtomicPattern(pattern) ? 'atom' : 'disjunction',
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
