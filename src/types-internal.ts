// Compilation
export type ComponentCompiler = (compiledChildren: string) => string;
export type CompilerMap = Record<string, ComponentCompiler>;
