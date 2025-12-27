import * as prompts from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import { generateProject } from './generator.js';
import { getProjectQuestions } from './prompts.js';
import type { CLIOptions, ProjectConfig } from './types.js';

/**
 * The main entry point for the CLI.
 * Sets up the command-line interface, parses arguments, prompts the user for configuration,
 * and triggers the project generation process.
 * @returns A promise that resolves when the CLI execution is complete.
 */
export async function cli(): Promise<void> {
  const program = new Command();
    
  program
    .name('create-stencil-components')
    .description('Create a stencil component library project using Nx, TypeScript, and SASS.')
    .argument('[project-name]', 'Name of the project')
    .option('-o, --organization-name <name>', 'Name of the organization (used in the name field of the package.json)')
    .option('-t, --template <type>', 'Template type (angular, react, vue, web-components, all)')
    //.option('-p, --package-manager <pm>', 'Package manager (npm, yarn, pnpm)')
    //.option('--no-git', 'Skip git initialization')
    //.option('--no-install', 'Skip dependency installation')
    .parse();

  const options = program.opts<CLIOptions>();
  const [projectName] = program.args;

  prompts.intro(pc.cyan('Welcome to create-stencil-components!'));

  try {
    // Get user input through prompts
    const config: ProjectConfig = await getProjectQuestions(projectName, options);
    
    // Generate the project
    await generateProject(config);
    prompts.outro(pc.green('Your project is ready!'));
    printNextSteps(config);
  } catch (error: unknown) {
    if (error instanceof Error) {
      prompts.log.error(pc.red(`Error: ${error.message}`));
    }
    process.exit(1);
  }
}

/**
 * Prints the next steps for the user after the project has been successfully generated.
 * @param config - The configuration object containing project details like name and package manager.
 */
function printNextSteps(config: ProjectConfig): void {
  const { projectName, packageManager = 'npm' } = config;
  
  console.log(pc.cyan('Next steps:'));
  console.log(`  ${pc.gray('$')} cd ${projectName}`);
  
  if (config.install === false) {
    console.log(`  ${pc.gray('$')} ${packageManager} install`);
    console.log(`  ${pc.gray('$')} npx nx run-many -t build`);
  } else {
    console.log(`  ${pc.gray('$')} npx nx run-many -t build`);
  }
}