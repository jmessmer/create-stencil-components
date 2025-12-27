/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-use-logical'],
  rules: {
    'block-no-empty': null,
    'custom-property-pattern': [
        `^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$`,
        {
            message: (name) => `Expected custom property name "${name}" to be kebab-case`
        }
    ],
    'csstools/use-logical': ('always' || true) || ('ignore' || false || null),
    'declaration-empty-line-before': null,
    'media-feature-range-notation': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
        true,
        {
            ignorePseudoClasses: ['global', 'export']
        }
    ]
  }
};