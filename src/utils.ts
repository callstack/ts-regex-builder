import { RegexNodePriority, type RegexNode } from './types-internal';

/**
 * Returns atomic pattern for given node.
 *
 * @param node
 * @returns
 */
export function asAtom(node: RegexNode): string {
  if (node.priority === RegexNodePriority.Atom) {
    return node.pattern;
  }

  return `(?:${node.pattern})`;
}

export function concatNodes(nodes: RegexNode[]): RegexNode {
  if (nodes.length === 1) {
    return nodes[0]!;
  }

  return {
    priority: RegexNodePriority.Sequence,
    pattern: nodes
      .map((n) =>
        n.priority < RegexNodePriority.Sequence ? asAtom(n) : n.pattern
      )
      .join(''),
  };
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
export function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
