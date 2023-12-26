import { type EncodeOutput } from './types';

/**
 * Returns atomic pattern for given node.
 *
 * @param node
 * @returns
 */
export function toAtom(node: EncodeOutput): string {
  if (node.precedence === 'atom') {
    return node.pattern;
  }

  return `(?:${node.pattern})`;
}

export function concatNodes(nodes: EncodeOutput[]): EncodeOutput {
  if (nodes.length === 1) {
    return nodes[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: nodes
      .map((n) => (n.precedence === 'alternation' ? toAtom(n) : n.pattern))
      .join(''),
  };
}
