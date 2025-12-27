import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { inlineSvg } from 'stencil-inline-svg';

const dev = process.argv.includes('--dev');

export const config: Config = {
  namespace: 'components-{{PROJECT_NAME_KEBAB}}-core',
  autoprefixCss: false,
  buildEs5: 'prod',
  devServer: {
    port: 3333,
    reloadStrategy: 'pageReload'
  },
  extras: {
    enableImportInjection: true
  },
  globalStyle: 'src/main.scss',
  hashFileNames: !dev,
  hydratedFlag: {
    selector: 'attribute'
  },
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core',
      hydrateModule: '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core/hydrate',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
      includePolyfills: false,
      proxiesFile: '../components-{{PROJECT_NAME_KEBAB}}-vue/src/components/generated/components.ts',
    }),
    {
      type: 'dist'
    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
      generateTypeDeclarations: false
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/hydrate'
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-vscode',
      file: 'dist/docs/components-{{PROJECT_NAME_KEBAB}}-core-vscode.json'
    },
    {
      type: 'www',
      dir: 'dist/www',
      serviceWorker: null
    },
  ],
  plugins: [
    inlineSvg(),
    sass()
  ],
  testing: {
    browserHeadless: "shell",
  },
};
