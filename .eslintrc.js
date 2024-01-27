const aliases = require('./aliases');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: Object.keys(aliases).map((aliasKey) => [
          aliasKey,
          aliases[aliasKey],
        ]),
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'import'],
  ignorePatterns: ['i18n.ts'],
  rules: {
    semi: [0, 'always'],
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'operator-linebreak': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/no-empty-function': 'off',
    'no-alert': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'camelcase': 'off',
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/order': [
      'error',
      {
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: '@src/**',
            group: 'internal',
          },
          {
            pattern: '@styles/**',
            group: 'internal',
          },
          {
            pattern: '@lib',
            group: 'internal',
          },
          {
            pattern: '@locales/**',
            group: 'internal',
          },
          {
            pattern: '@pages',
            group: 'internal',
          },
          {
            pattern: '@pages/**',
            group: 'internal',
          },
          {
            pattern: '@entities',
            group: 'internal',
          },
          {
            pattern: '@entities/**',
            group: 'internal',
          },
          {
            pattern: '@widgets',
            group: 'internal',
          },
          {
            pattern: '@widgets/**',
            group: 'internal',
          },
          {
            pattern: '@features',
            group: 'internal',
          },
          {
            pattern: '@features/**',
            group: 'internal',
          },
          {
            pattern: '@fb',
            group: 'internal',
          },
          {
            pattern: '@fb/**',
            group: 'internal',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
