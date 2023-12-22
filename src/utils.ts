import type { RegexElement } from './components/types';
import { type EncoderNode, EncoderPrecedence } from './encoder/types';

/**
 * Returns atomic pattern for given node.
 *
 * @param node
 * @returns
 */
export function toAtom(node: EncoderNode): string {
  if (node.precedence === EncoderPrecedence.Atom) {
    return node.pattern;
  }

  return `(?:${node.pattern})`;
}

export function concatNodes(nodes: EncoderNode[]): EncoderNode {
  if (nodes.length === 1) {
    return nodes[0]!;
  }

  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: nodes
      .map((n) =>
        n.precedence > EncoderPrecedence.Sequence ? toAtom(n) : n.pattern
      )
      .join(''),
  };
}

export function isRegexElement(element: unknown): element is RegexElement {
  return typeof element === 'object' && element !== null && 'type' in element;
}

export function isRegexElementOrString(element: unknown): boolean {
  return typeof element === 'string' || isRegexElement(element);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
export function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
