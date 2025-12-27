import * as prompts from '@clack/prompts';
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';
import type { ProjectConfig, TemplateVariables } from './types.js';
import { toCamelCase, toKebabCase, toPascalCase, toSnakeCase } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a new project based on the provided configuration.
 * @param config - The project configuration object.
 * @returns A promise that resolves when the project generation is complete.
 */
export async function generateProject(config: ProjectConfig): Promise<void> {
  const { projectName, template, packageManager = 'npm', git, install } = config;
  const targetDir = path.join(process.cwd(), projectName);

  // Check if directory already exists
  if (await fs.pathExists(targetDir)) {
    throw new Error(`Project directory ${projectName} already exists`);
  }

  await prompts.tasks([
    {
      title: 'Creating project directory',
      task: async () => {
        await fs.ensureDir(targetDir);
        await copyAndProcessTemplate(template, targetDir, config);
        return `Created project in ${targetDir}`;
      }
    },
    {
      title: 'Initializing git repository',
      task: async () => {
        if (git) {
          await initGit(targetDir);
          return `Initialized git repository`;
        }
        return `Skipped initializing git repository`;
      },
      enabled: false
    },
    {
      title: 'Installing dependencies',
      task: async () => {
        if (install) {
          await installDependencies(targetDir, packageManager);
          return `Installed dependencies`;
        }
        return `Skipped installing dependencies`;
      },
      enabled: false
    }
  ]);
}

/**
 * Copies the template files to the target directory and processes them.
 * @param template - The name of the template to use.
 * @param targetDir - The directory where the project will be created.
 * @param config - The project configuration.
 * @returns A promise that resolves when the template is copied and processed.
 */
async function copyAndProcessTemplate(
  template: string, 
  targetDir: string,
  config: ProjectConfig
): Promise<void> {
  const templatesRoot = path.join(__dirname, 'templates');
  const baseDir = path.join(templatesRoot, 'base');
  const templateDir = path.join(templatesRoot, 'variants', template);
  
  if (!await fs.pathExists(templateDir)) {
    throw new Error(`Template ${template} not found`);
  }

  // Prepare template variables
  const variables: TemplateVariables = {
    PROJECT_NAME: config.projectName,
    PROJECT_NAME_CAMEL: toCamelCase(config.projectName),
    PROJECT_NAME_KEBAB: toKebabCase(config.projectName),
    PROJECT_NAME_PASCAL: toPascalCase(config.projectName),
    PROJECT_NAME_SNAKE: toSnakeCase(config.projectName),
    ORGANIZATION_NAME: config.organizationName,
    LICENSE: config.license
  };

  // Step 1: Copy base template if it exists
  if (await fs.pathExists(baseDir)) {
    await fs.copy(baseDir, targetDir);
    // Rename gitignore if it exists
    await fs.move(
      path.join(targetDir, 'gitignore'), 
      path.join(targetDir, '.gitignore')
    );
  }

  // Step 2: Copy template-specific files (overwrites base files if needed)
  await fs.copy(templateDir, targetDir, { overwrite: true });

  // Step 3: Rename folders with variables
  await renameFolders(targetDir, variables);
  
  // Step 4: Rename files with variables
  await renameFiles(targetDir, variables);
  
  // Step 5: Process all file contents
  await processTemplateFiles(targetDir, variables);
}

/**
 * Renames folders within a directory by replacing template variables in their names.
 * @param dir - The directory to process.
 * @param variables - The template variables to replace.
 * @returns A promise that resolves when folder renaming is complete.
 */
async function renameFolders(
  dir: string, 
  variables: TemplateVariables
): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // Sort directories first, then process recursively
  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // First process subdirectories recursively
      await renameFolders(oldPath, variables);
      
      // Then rename this directory if needed
      const newName = replaceTemplateVariables(entry.name, variables);
      if (newName !== entry.name) {
        const newPath = path.join(dir, newName);
        await fs.move(oldPath, newPath);
      }
    }
  }
}

/**
 * Renames files within a directory by replacing template variables in their names.
 * @param dir - The directory to process.
 * @param variables - The template variables to replace.
 * @returns A promise that resolves when file renaming is complete.
 */
async function renameFiles(
  dir: string, 
  variables: TemplateVariables
): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await renameFiles(oldPath, variables);
    } else if (entry.isFile()) {
      // Rename file if it contains variables
      const newName = replaceTemplateVariables(entry.name, variables);
      if (newName !== entry.name) {
        const newPath = path.join(dir, newName);
        await fs.move(oldPath, newPath);
      }
    }
  }
}

/**
 * Processes all files in a directory to replace template variables in their content.
 * @param dir - The directory to process.
 * @param variables - The template variables to replace.
 * @returns A promise that resolves when file processing is complete.
 */
async function processTemplateFiles(
  dir: string, 
  variables: TemplateVariables
): Promise<void> {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Recursively process subdirectories
      await processTemplateFiles(filePath, variables);
    } else if (file.isFile()) {
      // Process file based on extension
      await processFile(filePath, variables);
    }
  }
}

/**
 * Processes a single file to replace template variables in its content.
 * @param filePath - The path to the file to process.
 * @param variables - The template variables to replace.
 * @returns A promise that resolves when the file is processed.
 */
async function processFile(
  filePath: string, 
  variables: TemplateVariables
): Promise<void> {
  const ext = path.extname(filePath);
  
  // Only process text files (not binaries like images)
  const textExtensions = [
    '.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.html', 
    '.css', '.scss', '.yaml', '.yml', '.txt', '.env', 
    '.gitignore', '.npmrc', '.editorconfig'
  ];

  if (textExtensions.includes(ext) || !ext) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      
      // Replace template variables
      content = replaceTemplateVariables(content, variables);
      
      await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
      // Skip binary files that can't be read as text
      prompts.log.message(pc.gray(`  Exception process file: ${error}`));
      prompts.log.message(pc.gray(`  Skipping binary file: ${path.basename(filePath)}`));
    }
  }
}

/**
 * Replaces template variables in a string content.
 * @param content - The content string.
 * @param variables - The template variables to replace.
 * @returns The content with variables replaced.
 */
function replaceTemplateVariables(
  content: string, 
  variables: TemplateVariables
): string {
  let result = content;

  // Replace {{VARIABLE_NAME}} tokens
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
}

/**
 * Initializes a git repository in the target directory.
 * @param targetDir - The directory to initialize git in.
 * @returns A promise that resolves when git initialization is complete.
 */
async function initGit(targetDir: string): Promise<void> {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
  } catch (error) {
    prompts.log.warn(pc.yellow(`Failed to initialize git repository: ${error}`));
  }
}

/**
 * Installs project dependencies using the specified package manager.
 * @param targetDir - The project directory.
 * @param packageManager - The package manager to use (e.g., 'npm', 'yarn', 'pnpm').
 * @returns A promise that resolves when dependencies are installed.
 */
async function installDependencies(targetDir: string, packageManager: string): Promise<void> { 
  try {
    execSync(`${packageManager} install`, { 
      cwd: targetDir, 
      stdio: 'inherit' 
    });
  } catch (error) {
    prompts.log.warn(pc.yellow(`Failed to install dependencies: ${error}`));
    prompts.log.info(pc.gray(` Run "${packageManager} install" manually`));
  }
}