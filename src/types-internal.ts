// Compilation
export type ElementCompiler = (compiledChildren: string) => string;
export type CompilerMap = Record<string, ElementCompiler>;
