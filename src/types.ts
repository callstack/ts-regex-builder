import type { EncodeOutput } from './encoder/types';

export type RegexSequence = RegexElement[] | RegexElement;

export type RegexElement = RegexEncodable | string;

export interface RegexEncodable {
  type: string;
  encode(): EncodeOutput;
}
