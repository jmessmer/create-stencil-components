# @{{ORGANIZATION_NAME}}/{{PROJECT_NAME_KEBAB}}

## Overview

Build modern, lightning-fast web applications for any platform using a single codebase. This toolkit utilizes [web components](https://www.webcomponents.org/introduction) to ensure premium quality and streamlined development.

Stencil is a specialized compiler designed to generate standards-compliant Web Components (Custom Elements) compatible with any browser. By integrating premium features from modern frontend frameworks—including TypeScript, JSX, a virtual DOM, and reactive one-way data binding—into a compile-time engine, Stencil produces high-performance components. These components are framework-agnostic, allowing them to integrate seamlessly with any existing stack or operate as standalone elements.

**Core Tech Stack:**

- **Stencil**: The underlying Web Component compiler.
- **TypeScript**: Ensures type safety and robust development.
- **Nx**: Manages the build system and monorepo architecture.
- **Sass**: Handles advanced, scalable CSS styling.
- **Eslint & Stylelint**: Maintain code quality through static analysis for scripts and styles.
- **Prettier**: Enforces consistent code formatting across the project.

## Build / Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- **Volta:** The workspace uses [volta](https://volta.sh) to manage its npm and Node versions. [Install it](https://docs.volta.sh/guide/getting-started) before proceeding.
  - There's no need to install a specific version of npm or Node right now, it shall be done automatically for you.
- **IDE:** We recommend [VS Code](https://code.visualstudio.com/) with the [Stencil Tools](https://marketplace.visualstudio.com/items?itemName=ionic.stencil-helper) extension.

### Installation & Running

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Build for production:**

    ```bash
    npx nx run-many -t build
    ```

3. **Run unit tests:**

    ```bash
    npx nx run-many -t test
    ```

## Folder Hierarchy

The repository structure is organized as follows:

```text
├── .eslintignore/            # ESLint ignore rules
├── .gitignore                # Git ignore rules
├── .husky/                   # Git hooks configuration
├── .mcp.json                 # MCP configuration
├── .nvmrc                    # NVM configuration
├── .prettierignore           # Prettier ignore rules
├── .stylelintignore          # Stylelint ignore rules
├── docs/                     # Documentation files
│   ├── CONTRIBUTING.md       # Contributing guidelines
│   ├── CODE_OF_CONDUCT.md    # Contributor Code of Conduct
|   ├── LICENSE.md            # License file
│   └── STYLE_GUIDE.md        # Stencil Style Guide
├── packages/                 # Directory for npm workspaces
│   └── [package-name]/       # Individual Stencil component library
├── AGENTS.md                 # AI context and guidelines for Nx
├── CLAUDE.md                 # AI context and guidelines for Nx
├── commitlint.config.mjs     # Commitlint configuration
├── eslint.config.mjs         # ESLint configuration
├── nx.json                   # Nx build system configuration
├── package-lock.json         # NPM lock file
├── package.json              # Root configuration: workspaces, dependencies, and scripts
├── prettier.config.mjs       # Prettier configuration
├── stylelint.config.mjs      # Stylelint configuration
├── tsconfig.base.json        # Base TypeScript configuration
└── README.md                 # Project documentation
```

## Contributing

Thanks for your interest in contributing!
Please take a moment to read up on our guidelines for [contributing](/docs/CONTRIBUTING.md). Please note that this project is released with a [Contributor Code of Conduct](/docs/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
