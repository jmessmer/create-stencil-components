import * as prompts from '@clack/prompts';
import type { CLIOptions, PackageManager, ProjectConfig, TemplateType } from './types.js';

import { adjectives, colors, names, uniqueNamesGenerator } from 'unique-names-generator';

/**
 * Prompts the user for project configuration details.
 * @param projectName - The name of the project, if provided as an argument.
 * @param options - Command-line options that pre-fill or configure the prompts.
 * @returns A promise that resolves to the complete project configuration.
 */
export async function getProjectQuestions(
    projectName: string | undefined,
    options: CLIOptions
): Promise<ProjectConfig> {
    const answers = await prompts.group({
        projectName: async () => {
            return prompts.text({
                message: 'Project name:',
                initialValue: projectName || uniqueNamesGenerator({
                    dictionaries: [adjectives, colors],
                    separator: '-',
                    style: 'lowerCase',
                    length: 2,
                }),
                validate: (value: string) => {
                    if (!value || value.trim() === '') {
                        return 'Project name is required';
                    }
                    if (!/^[a-z0-9-_]+$/.test(value)) {
                        return 'Invalid project name (can only contain lowercase letters, numbers, hyphens, and underscores)';
                    }
                    return undefined;
                }
            });
        },
        organizationName: async () => {
            return prompts.text({
                message: 'Organization name (used in the scope name field of the package.json):',
                initialValue: options?.organizationName || uniqueNamesGenerator({
                    dictionaries: [names],
                    style: 'lowerCase',
                    length: 1
                }),
                validate: (value: string) => {
                    if (!value || value.trim() === '') {
                        return 'Organization name is required';
                    }
                    if (!/^[a-z]+$/.test(value)) {
                        return 'Organization name can only contain lowercase letters';
                    }
                    return undefined;
                }
            });
        },
        template: async () => {
            return prompts.select({
                message: 'Select a framework:',
                options: [
                    { label: 'angular', value: 'angular', hint: 'Angular framework' },
                    { label: 'react', value: 'react', hint: 'React framework' },
                    { label: 'vue', value: 'vue', hint: 'Vue framework' },
                    { label: 'web-components', value: 'web-components', hint: 'Web components only' },
                    { label: 'all', value: 'all', hint: 'Includes all frameworks' }
                ],
                initialValue: options.template || 'all',
                maxItems: 5
            });
        },
        packageManager: () => Promise.resolve('npm' as PackageManager),
        git: () => Promise.resolve(false),
        install: () => Promise.resolve(false)
    }, {
        onCancel: () => {
            prompts.cancel('Operation cancelled');
            process.exit(1);
        }
    });

    return {
      projectName: answers.projectName,
      organizationName: answers.organizationName,
      template: answers.template as TemplateType,
      packageManager: answers.packageManager,
      git: answers.git,
      install: answers.install
    };
}

export default getProjectQuestions;