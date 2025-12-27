# Style Guide

## 1. Component Architecture

### Naming Conventions

- **Tag Name:** The prefix has a major role when you are creating a collection of components intended to be used across different projects. Web Components are not scoped because they are globally declared within the webpage, which means an "unique" prefix is needed to prevent collisions. Must be lowercase and hyphenated (kebab-case). It must include at least one hyphen to comply with W3C Custom Element standards.
  - *Good:* `my-data-table`, `ui-button`
  - *Bad:* `myDataTable`, `uibutton`
- **Class Name:** Use PascalCase for the TypeScript class name, matching the component tag without hyphens.
  - *Example:* `<my-data-table>` becomes `class MyDataTable`.
- **File Names:** Name files after the tag name.
  - *Example:* `my-button.tsx`, `my-button.css`, `my-button.spec.ts`.

### Directory Structure

Each component should reside in its own folder within `src/components/`:

```text
src/components/my-component/
│── test/
│   ├── my-component.e2e.ts  (End-to-end tests
│   └── my-component.spec.ts (Unit tests)
├── my-component.scss
├── my-component.tsx
└── readme.md            (Auto-generated)
```

## 2. TypeScript Standards

### Member Ordering

Maintain a consistent order for class members to improve readability:

1. **Properties:** `@Element()`, `@Prop()`, `@State()`
2. **Internal Variables:** Private/Protected properties
3. **Events:** `@Event()`
4. **Watchers:** `@Watch()`
5. **Lifecycle Hooks:** `connectedCallback`, `componentWillLoad`, etc.
6. **Methods:** `@Listen()`, `@Method()`, then private helper methods
7. **Render:** `render()`

### Typing

- **Strictness:** Always enable `strict: true` in `tsconfig.json`.
- **Explicit Returns:** Define return types for all functions and `@Method()` calls.
- **Interfaces:** Prefix interfaces with `I` (optional, based on preference) or place them in a shared `types.ts` file if used by multiple components.

## 3. Stencil Decorator Usage

### Props (@Prop)

- Use **camelCase** for property names in TypeScript. Stencil automatically maps these to **kebab-case** attributes in HTML.
- **Initialization:** Always provide a default value if a prop is not required.
- **Immutability:** Set `mutable: true` only when the component needs to modify its own prop.

### State (@State)

- Use `@State()` for any internal data that should trigger a re-render.
- For objects and arrays, use **immutable updates**:

  ```typescript
  // Good
  this.items = [...this.items, 'new-item'];
  // Bad
  this.items.push('new-item');
  ```

### Events (@Event)

- Use **camelCase** for event names (e.g., `todoCompleted`).
- Provide specific types for the `EventEmitter` payload: `EventEmitter<ISearchResult>`.

## 4. JSX & Rendering

### The `<Host>` Element

Always use the `<Host>` component as the top-level element in your `render()` function to manage attributes and classes on the custom element itself.

```tsx
render() {
  return (
    <Host class={{ 'is-active': this.isActive }}>
      <slot />
    </Host>
  );
}
```

### Conditional Rendering

Use ternary operators or short-circuit evaluation for simple conditions. For complex logic, extract the JSX to a private method.

```tsx
render() {
  return (
    <div>
      {this.isLoading ? <spinner-icon /> : <slot />}
    </div>
  );
}
```

## 5. CSS & Styling

### Shadow DOM

- Use `shadow: true` by default.
- Use **CSS Variables** for any values that need to be "themeable" from outside the component.
- **Naming:** Follow BEM (Block Element Modifier) if not using scoped CSS, or simple descriptive classes if using Shadow DOM.

### Selectors

- Use `:host` to style the component container.
- Use `:host-context(.dark-theme)` for theme-dependent styling.
- Use `::slotted(selector)` to style elements passed into a slot.

## 6. Performance

- **Minimize @Watch:** Only use `@Watch` when you need to perform side effects (like fetching data) in response to a prop change. Avoid using it to sync state.
- **Lazy Loading:** Keep component logic lean. If a library is large, consider dynamic imports inside `componentWillLoad`.
- **Ref usage:** Avoid direct DOM manipulation. Use `ref={(el) => this.myElement = el}` only when absolutely necessary.

## 7. Testing & Quality

- **Unit Tests:** Test logic, formatting, and state changes in `.spec.ts`.
- **E2E Tests:** Test DOM rendering and event firing in `.e2e.ts`.
- **Comments:** Use JSDoc for all public `@Prop` and `@Method` members to ensure the generated `readme.md` is helpful for consumers.
