import type { RegexComponent } from './types';
import { compilers as quantifiers } from './quantifiers';

/**
 * Generate RegExp object from components.
 *
 * @param components
 * @returns
 */
export function buildRegex(...components: RegexComponent[]): RegExp {
  const pattern = compileList(components);
  return new RegExp(pattern);
}

/**
 * Generate regex pattern from components.
 * @param components
 * @returns
 */
export function buildPattern(...components: RegexComponent[]): string {
  return compileList(components);
}

// Recursive compilation

function compileList(components: RegexComponent[]): string {
  return components.map((c) => compileSingle(c)).join('');
}

function compileSingle(component: RegexComponent): string {
  if (typeof component === 'string') {
    return component;
  }

  const componentCompiler = quantifiers[component.type];
  if (!componentCompiler) {
    throw new Error(`Unknown component type ${component.type}`);
  }

  const children = compileList(component.children);
  return componentCompiler(children);
}
