import type { EncodeOutput } from './encoder/types';

export type RegexNode = RegexElement | string;

export interface RegexElement {
  type: string;
  encode(): EncodeOutput;
}
