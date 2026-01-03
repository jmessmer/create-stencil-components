# @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-vue

## Overview

Vue specific wrappers for the @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core package.

## Tasks

The following is a list of available command line tasks:

| Task          | Description                                     |
| ------------- | ----------------------------------------------- |
| clean         | Deletes build outputs of the package.           |
| build         | Builds the package.                             |
| format        | Validates the form of the package.              |
| format:fix    | Performs a format fix of the package.           |
| lint          | Validates the code of the package.              |
| lint:fix      | Performs a validation fix of the package.       |
| test          | Performs a test run of the package.             |

You can execute tasks within an [Nx](https://nx.dev) workspace using several methods. Here are the most common approaches:

**From the `workspace` root:**

Use the full package target path to run tasks:

```sh
npx nx run components-{{PROJECT_NAME_KEBAB}}-vue:[task]
npx nx run components-{{PROJECT_NAME_KEBAB}}-vue:build
```

**From within the package directory:**

Navigate to packages/components-{{PROJECT_NAME_KEBAB}}-vue and run the task directly:

```sh
npx nx run [task]
npx nx run build
```

## Folder Hierarchy

The package structure is organized as follows:

```text
├── src/               # Source code
│   ├── components/    # Directory for component exports and implementation entry
│   │   └── generated/ # Directory for generated component outputs
│   │   └── index.ts   # Barrel export for components
│   └── index.ts       # Barrel export for components
├── package.json       # Root configuration: workspaces, dependencies, and scripts
├── project.json       # Project Nx build system configuration
├── tsconfig.json      # TypeScript configuration
├── CHANGELOG.md       # Changelog documentation
└── README.md          # Package documentation
```

## Consumer Consumption

### Prerequisite: Install Dependencies

```sh
npm install @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-vue
```

### Using Framework Wrappers

**Local Registration**: Best for performance (tree-shaking). In your .vue file:

```ts
<script>
import { MyComponent } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-vue';
</script>

<template>
  <MyComponent first="Stencil" last="Vue" />
</template>
```
