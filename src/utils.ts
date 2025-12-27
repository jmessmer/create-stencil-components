import fs from 'fs-extra';
import path from 'node:path';

/**
 * Checks if a directory is empty.
 * @param dirPath - The path to the directory to check.
 * @returns A promise that resolves to true if the directory is empty, false otherwise.
 */
export async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  } catch {
    return false;
  }
}

/**
 * Validates if a project name consists only of alphanumeric characters, hyphens, and underscores.
 * @param name - The project name to validate.
 * @returns True if the name is valid, false otherwise.
 */
export function validateProjectName(name: string): boolean {
  return /^[a-z0-9-_]+$/i.test(name);
}

/**
 * Checks if a file or directory exists at the given path.
 * @param filePath - The path to check.
 * @returns A promise that resolves to true if the file exists, false otherwise.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the absolute path to a specific template directory.
 * @param template - The name of the template.
 * @returns The absolute path to the template directory.
 */
export function getTemplateDir(template: string): string {
  return path.join(process.cwd(), 'templates', template);
}

/**
 * Converts a string to PascalCase.
 * @param str - The string to convert.
 * @returns The PascalCase string.
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

/**
 * Converts a string to camelCase.
 * @param str - The string to convert.
 * @returns The camelCase string.
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Converts a string to snake_case.
 * @param str - The string to convert.
 * @returns The snake_case string.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '');
}

/**
 * Converts a string to kebab-case.
 * @param str - The string to convert.
 * @returns The kebab-case string.
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/[_\s]+/g, '-')
    .replace(/^-/, '');
}