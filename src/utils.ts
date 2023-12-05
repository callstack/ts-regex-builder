export function wrapGroup(input: string): string {
  return input.length === 1 ? input : `(${input})`;
}
