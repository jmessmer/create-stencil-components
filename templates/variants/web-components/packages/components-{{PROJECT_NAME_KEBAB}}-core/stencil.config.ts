import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
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
