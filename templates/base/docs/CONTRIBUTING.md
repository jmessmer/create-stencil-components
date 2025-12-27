# Contributing

First off, thank you for considering contributing! It is people like you who make this a great tool for the community.

## 1. Development Environment

### Prerequisites

- **Volta:** The workspace uses [volta](https://volta.sh) to manage its npm and Node versions. [Install it](https://docs.volta.sh/guide/getting-started) before proceeding.
  - There's no need to install a specific version of npm or Node right now, it shall be done automatically for you.
- **IDE:** We recommend [VS Code](https://code.visualstudio.com/) with the [Stencil Tools](https://marketplace.visualstudio.com/items?itemName=ionic.stencil-helper) extension.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build:

   ```bash
   npx nx run-many -t build
   ```

   This will open a browser window with your component library's collection.

## 2. Creating a New Component

To maintain consistency, please use the Stencil CLI to generate new components:

```bash
npx nx run components-{{PROJECT_NAME_KEBAB}}-core:generate
```

*(Enter the component name in kebab-case, e.g., `my-new-button`)*

Ensure your new component includes:

- A `.tsx` file for logic and rendering.
- A `.css` or `.scss` file for styling.
- A `.spec.ts` file for unit tests.
- A `.e2e.ts` file for end-to-end tests.

## 3. Standards & Style

Please review our [STYLE_GUIDE.md](./STYLE_GUIDE.md) before submitting code. Key highlights include:

- **TypeScript:** Use strict typing; avoid `any`.
- **Naming:** Components must be `kebab-case`.
- **Documentation:** Use JSDoc comments on `@Prop`, `@State`, and `@Event`. Stencil uses these to auto-generate `readme.md` files. **Do not manually edit the `readme.md` files in component folders.**

## 4. Testing Requirements

We cannot accept pull requests without passing tests.

- **Run Unit Tests:**

  ```bash
  npx nx run-many -t test
  ```

- **Run E2E Tests:**

  ```bash
   npx nx run-many -t test:e2e
  ```

- **Build Verification:**

  ```bash
   npx nx run-many -t build
  ```

Ensure that your component remains accessible (A11y). Use tools like Axe to verify that your web components meet WCAG standards.

## 5. Pull Request Process

1. **Branching:** Create a feature branch from `main` (e.g., `feat/add-datepicker` or `fix/button-alignment`).
2. **Commits:** Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: added shadow-dom support`).
3. **Draft PR:** If your work is in progress, open it as a "Draft".
4. **Review:** At least one maintainer must review and approve your PR before it can be merged.
5. **CI:** Ensure the Github Actions (or CI of choice) pass successfully.

## 6. Code of Conduct

By contributing, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please be respectful and professional in all interactions.

## 7. Useful Scripts

- `npx nx run-many -t build`: Production build of the components.
- `npx nx run-many -t test`: Runs unit tests.

---
Questions? Feel free to open an issue or reach out to the maintainers!
