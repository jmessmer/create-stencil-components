# @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core

## Overview

A framework-agnostic collection of [web components](https://www.webcomponents.org/introduction) built for maximum compatibility. These components integrate seamlessly with popular libraries like React, Angular, and Vue, or can function entirely on their own using standard browser JavaScript.

## Tasks

The following is a list of available command line tasks:

| Task          | Description                                     |
| ------------- | ----------------------------------------------- |
| clean         | Deletes build outputs of the package.           |
| build         | Builds the package.                             |
| format        | Validates the form of the package.              |
| format:fix    | Performs a format fix of the package.           |
| generate      | Creates a stencil component.                    |
| lint          | Validates the code of the package.              |
| lint:fix      | Performs a validation fix of the package.       |
| server:dev    | Run a standalone stencil server of the code.    |
| test          | Performs a test run of the package.             |
| test:e2e      | Performs end-to-end test run of the package.    |
| test:watch    | Performs a watch of the test run of the package |

You can execute tasks within an [Nx](https://nx.dev) workspace using several methods. Here are the most common approaches:

**From the `workspace` root:**

Use the full project target path to run tasks:

```sh
npx nx run components-{{PROJECT_NAME_KEBAB}}-core:[task]
npx nx run components-{{PROJECT_NAME_KEBAB}}-core:build
```

**From within the package directory:**

Navigate to packages/components-{{PROJECT_NAME_KEBAB}}-core and run the task directly:

```sh
npx nx run [task]
npx nx run build
```

## Output Targets

- **dist**: Generate the component(s) as a reusable library that can be self-lazy loading.
  - **cjs and esm**: Bundler ready javascript file for commonjs and modules.
  - **collection**: Stencil files transpiled to simple javascript.  Those are the files used if
  you import your library into another stencil distribution.
  - **loader**: Bundler entry for lazy loaded builds (used for example to register all components
  at once in the web component registry with defineCustomElements function).
  - **output-target-stencils (app workspace name)**: Browser ready component.
  - **types**: Typescript types with d.ts files.
- **dist-custom-elements**: Custom elements that directly extend HTMLElement and provides simple utility functions for easily defining these elements on the Custom Element Registry.
- **www**: Oriented for web apps and websites, hosted from an http server.

## Folder Hierarchy

The package structure is organized as follows:

```text
├── src/               # Source code
│   ├── components/    # Stencil components
│   │   └── [name]/    # Component files (*.tsx, *.css, *.spec.ts, *.e2e.ts)
│   ├── index.html     # Dev server entry
│   └── index.ts       # Library export entry point
├── package.json       # Root configuration: workspaces, dependencies, and scripts
├── project.json       # Project Nx build system configuration
├── stencil.config.ts  # Stencil build configuration
├── tsconfig.json      # TypeScript configuration
├── CHANGELOG.md       # Changelog documentation
└── README.md          # Package documentation
```
