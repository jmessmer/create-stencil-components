# Release Process

This project uses [Nx Release](https://nx.dev/features/manage-releases) to manage versioning, changelog generation, and publishing of our StencilJS components.

## 1. Prerequisites

Before initiating a release, ensure you have the following:

- Permissions to push to the `main` branch.
- A valid `NPM_TOKEN` if publishing to a registry.
- Clean working directory (all changes committed).

## 2. Standard Release Workflow (Dry Run)

Always perform a dry run first to inspect what Nx will do without making permanent changes.

```bash
npx nx release --dry-run
```

This command will:

1. **Version:** Determine the next version based on [Conventional Commits](https://www.conventionalcommits.org/).
2. **Changelog:** Generate or update `CHANGELOG.md` files.
3. **Plan:** Show the summary of changes without committing or tagging.

## 3. Executing a Full Release

If the dry run looks correct, execute the release. By default, this handles versioning, changelogs, and committing.

```bash
npx nx release
```

### What happens during execution:

- **Versioning:** Updates `package.json` in individual component projects and the root.
- **Changelog:** Updates the root and per-project `CHANGELOG.md` files.
- **Git:** Commits the changes and creates a Git tag (e.g., `v1.2.3`).
- **Build:** Nx automatically triggers the `build` target for all affected projects.
- **Publish:** Uploads the built artifacts to the NPM registry.

## 4. Specific Release Scenarios

### Preview/Prerelease

To create an alpha or beta release:

```bash
npx nx release --specifier next --preid alpha
```

### Versioning without Publishing

If you want to version the code but manually handle the publish step later:

```bash
npx nx release version
```

### Publishing Only

If the versions are already bumped and you just need to push to the registry:

```bash
npx nx release publish
```

## 5. Continuous Integration (CI)

Our CI pipeline (GitHub Actions) is configured to handle releases automatically when code is merged into `main`. 

1. **Validation:** CI runs `lint`, `test`, and `build`.
2. **Release:** If validation passes, `nx release` is called.
3. **Provenance:** We use `--first-release` or standard flags to ensure NPM provenance is recorded where supported.

## 6. StencilJS Specifics

When releasing Stencil components in an Nx monorepo:

- **Distribution Folder:** Ensure the `dist` and `www` folders are correctly defined in each project's `project.json`.
- **Peer Dependencies:** Nx Release correctly handles internal dependency updates. If `component-a` depends on `component-b`, it will ensure versions remain in sync according to your `nx.json` release configuration.

## 7. Troubleshooting

- **Version Mismatch:** If versions get out of sync, check the `release` configuration in `nx.json`. We typically use "fixed" versioning (all packages share one version).
- **Build Failures:** Stencil builds may fail if TypeScript types are missing. Ensure `nx build` passes locally for all affected components before running the release.
- **OTP:** If your NPM account requires 2FA, use:

  ```bash
  npx nx release --otp 123456
  ```

---
*For details on configuring the release logic, see the `release` object in `nx.json`.*
