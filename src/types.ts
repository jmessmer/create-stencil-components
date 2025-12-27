export interface ProjectConfig {
  projectName: string;
  organizationName?: string;
  template: TemplateType;
  packageManager?: PackageManager;
  git?: boolean;
  install?: boolean;
  license?: string;
}

export type TemplateType = 'all' | 'angular' | 'react' | 'vue' | 'web-components';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export interface PromptAnswer {
  projectName?: string;
  organizationName?: string;
  template?: TemplateType;
  packageManager?: PackageManager;
  git?: boolean;
  install?: boolean;
  license?: string;
}

export interface CLIOptions {
  organizationName?: string;
  template?: string;
  packageManager?: string;
  git?: boolean;
  install?: boolean;
}

export interface TemplateVariables {
  PROJECT_NAME: string;
  PROJECT_NAME_CAMEL?: string;   // myAwesomeProject
  PROJECT_NAME_KEBAB?: string;   // my-awesome-project
  PROJECT_NAME_PASCAL?: string;  // MyAwesomeProject
  PROJECT_NAME_SNAKE?: string;   // my_awesome_project
  ORGANIZATION_NAME: string | undefined;
  LICENSE: string | undefined;
  [key: string]: string | undefined;
}