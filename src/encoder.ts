import type { EncodedRegex, RegexElement, RegexSequence } from './types';
import { ensureElements, ensureText } from './utils';

export function encode(sequence: RegexSequence): EncodedRegex {
  const elements = ensureElements(sequence);
  const encoded = elements.map((n) => encodeElement(n));

  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 1,
    pattern: encoded.map((n) => (n.precedence === 2 ? encodeAtomic(n) : n.pattern)).join(''),
  };
}

export function encodeAtomic(sequence: RegexSequence): string {
  const encoded = encode(sequence);
  return encoded.precedence === 0 ? encoded.pattern : `(?:${encoded.pattern})`;
}

function encodeElement(element: RegexElement): EncodedRegex {
  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (element instanceof RegExp) {
    return encodeRegExp(element);
  }

  if (typeof element === 'object') {
    // EncodedRegex
    if ('pattern' in element) {
      return element;
    }

    // LazyEncodableRegex
    if ('encode' in element) {
      return element.encode();
    }
  }

  throw new Error(`Unsupported element. Received: ${JSON.stringify(element, null, 2)}`);
}

function encodeText(text: string): EncodedRegex {
  ensureText(text);

  return {
    // Optimize for single character case
    precedence: text.length === 1 ? 0 : 1,
    pattern: escapeText(text),
  };
}

function encodeRegExp(regexp: RegExp): EncodedRegex {
  const pattern = regexp.source;

  return {
    // Encode at safe precedence
    precedence: isAtomicPattern(pattern) ? 0 : 2,
    pattern,
  };
}

// This is intended to catch only some popular atomic patterns like char classes and groups.
function isAtomicPattern(pattern: string): boolean {
  // Simple char, char class [...] or group (...)
  return pattern.length === 1 || /^\[[^[\]]*\]$/.test(pattern) || /^\([^()]*\)$/.test(pattern);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
