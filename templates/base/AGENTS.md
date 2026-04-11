# Agent Instructions for this repository

This repository is an Nx monorepo that utilizes StencilJS, TypeScript, and SCSS for building web components.

You are an expert in Nx, StencilJS, TypeScript, SCSS and scalable web application development. You write functional, maintainable, performant, and
accessible code following StencilJS, TypeScript, and SCSS best practices. When assisting with this codebase, adhere to these standards to ensure
compatibility, performance, and type safety.

## 1. Project Overview

- **Framework:** StencilJS (latest)
- **Language:** TypeScript
- **Styling:** CSS/SASS (Shadow DOM enabled by default)
- **Testing:** Vitest / Jest / Puppeteer

## 2. Component Structure

Always follow the standard Stencil component decorator pattern:

```tsx
import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'my-component',
    styleUrl: 'my-component.scss',
    shadow: true,
})
export class MyComponent {
    /** Public properties */
    @Prop() label: string;

    /** Internal state */
    @State() isActive: boolean = false;

    /** Custom events */
    @Event() clicked: EventEmitter<void>;

    private handleClick = () => {
        this.isActive = !this.isActive;
        this.clicked.emit();
    };

    render() {
        return (
            <Host>
                <button onClick={this.handleClick}>
                    {this.label} - {this.isActive ? 'Active' : 'Inactive'}
                </button>
            </Host>
        );
    }
}
```

## 3. TypeScript Guidelines

- **Strict Typing:** Avoid `any`. Define interfaces for all complex Prop types.
- **Decorators:** Use `@Prop()`, `@State()`, `@Method()`, `@Watch()`, and `@Listen()` correctly.
- **Null Safety:** Use optional chaining `?.` and nullish coalescing `??`.
- **Enums:** Use `const enum` for performance or literal types for simplicity in Props.

## 4. Best Practices

- **Shadow DOM:** Use `shadow: true` unless there is a specific requirement to use scoped or global CSS.
- **Functional Components:** Use simple functional components (returning JSX) for UI-only elements that don't need the Stencil lifecycle.
- **Reactivity:** Remember that Stencil only tracks changes to `@State` and `@Prop`. Arrays and objects must be reassigned (immutable patterns) to trigger a re-render:

    ```typescript
    // Correct
    this.items = [...this.items, newItem];
    // Incorrect
    this.items.push(newItem);
    ```

- **Performance:** Minimize use of `@Watch` to avoid unnecessary renders. Use the `render()` method efficiently.

## 5. Styling Rules

- Use CSS Variables for theming to allow consumers to style components from outside the Shadow DOM.
- Prefer the `:host` selector for base component styling.
- Use the `<Host>` functional component in the `render()` method to apply classes or attributes to the component container itself.

## 6. Testing

- **Spec Tests:** Focus on logic and rendering.
- **E2E Tests:** Use for interaction and cross-browser behavior.
- Ensure all new components include a `.spec.ts` file.

## 7. Documentation

- Use JSDoc comments for all `@Prop`, `@Method`, and `@Event` definitions. Stencil's compiler uses these to generate the `readme.md` files.

## 8. Useful Commands

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npx run-many -t clean` | Deletes build outputs for all the packages. |
| `npx run-many -t build` | Builds all the packages.                    |
| `npx run-many -t lint`  | Validates the code for all the packages.    |
| `npx run-many -t test`  | Performs a test run for all the packages.   |

## When stuck

- Ask a clarifying question, propose a short plan, or open a draft PR with notes

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
