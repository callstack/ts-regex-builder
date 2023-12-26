import type { RegexNode } from '../types';

export function asNodeArray(nodeOrArray: RegexNode | RegexNode[]): RegexNode[] {
  return Array.isArray(nodeOrArray) ? nodeOrArray : [nodeOrArray];
}
