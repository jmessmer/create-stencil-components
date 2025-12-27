# @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-react

## Overview

React specific wrappers for the @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core package.

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
npx nx run components-{{PROJECT_NAME_KEBAB}}-react:[task]
npx nx run components-{{PROJECT_NAME_KEBAB}}-react:build
```

**From within the package directory:**

Navigate to packages/components-{{PROJECT_NAME_KEBAB}}-react and run the task directly:

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
npm install @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-react
```

### Using Framework Wrappers

**Local Registration**: Best for performance (tree-shaking). In your .tsx file:

```tsx
import { MyComponent } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-react';

function App() {
  return <MyComponent first="Stencil" last="React" />;
}
```

### Using Custom Elements Directly

**Registration**: In main.tsx, import the loader to register all components with the browser's CustomElementRegistry.

```tsx
import { defineCustomElements } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core/loader';
defineCustomElements(); // Registers all tags (e.g., <my-component>)
```

**Usage**: Once registered, you simply use the tag in your template without further imports.

```tsx
<my-component first="Stencil" last="React"></my-component>
```

### Which should you choose?

**React Wrappers**: Best for large-scale apps, TypeScript users, and those using React versions prior to 19.

**Direct Usage**: Best for simple integrations, lightweight projects, or if you are already using React 19+ which has improved custom element support.
