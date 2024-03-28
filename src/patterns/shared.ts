import { charClass, charRange, digit } from '../constructs/character-class';

export const lowercase = charRange('a', 'z');
export const uppercase = charRange('A', 'Z');
export const alphabetical = charClass(lowercase, uppercase);
export const hexDigit = charClass(digit, charRange('a', 'f'), charRange('A', 'F'));
