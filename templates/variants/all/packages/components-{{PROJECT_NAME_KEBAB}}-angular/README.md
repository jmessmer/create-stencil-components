# @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-angular

## Overview

Angular specific wrappers for the @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core package.

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
npx nx run components-{{PROJECT_NAME_KEBAB}}-angular:[task]
npx nx run components-{{PROJECT_NAME_KEBAB}}-angular:build
```

**From within the package directory:**

Navigate to packages/components-{{PROJECT_NAME_KEBAB}}-angular and run the task directly:

```sh
npx nx run [task]
npx nx run build
```

## Folder Hierarchy

The package structure is organized as follows:

```text
├── src/            # Directory for lazy loaded component implementations
├── standalone/     # Directory for standalone component implementations
├── ng-package.json # Ng-packagr configuration
├── package.json    # Root configuration: workspaces, dependencies, and scripts
├── project.json    # Project Nx build system configuration
├── tsconfig.json   # TypeScript configuration
├── CHANGELOG.md    # Changelog documentation
└── README.md       # Package documentation
```

## Consumer Consumption

### Prerequisite: Install Dependencies

```sh
npm install @{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-angular
```

### Using Framework Wrappers

**Registration**: In the Angular library's main module (or main.ts for standalone apps), use the Stencil loader to register the components with the browser:

```ts
import { defineCustomElements } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core/loader';
defineCustomElements();
```

**Usage**: In your Angular application, import the generated wrapper module or individual standalone components:

```ts
import { MyComponent } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-angular/standalone';;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyComponent], // Use the wrapper component here
  template: `<my-component [first]="'Stencil'" [last]="'Angular'"></my-component>`
})
export class AppComponent { ... }
```

### Using Custom Elements Directly

**Registration**: In main.ts, import the loader to register all components with the browser's CustomElementRegistry.

```ts
import { defineCustomElements } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core/loader';
defineCustomElements();
```

**Usage**: Angular will error on unknown tags. You must add CUSTOM_ELEMENTS_SCHEMA to any module or component that uses the Stencil tags.

```tsx
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Tells Angular to ignore unknown tags
  template: `<my-component [first]="'Stencil'" [last]="'Angular'"></my-component>`
})
export class AppComponent { }
```
