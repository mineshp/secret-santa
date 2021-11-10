module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  globals: {
    jest: true,
    document: true,
    browser: true,
    driver: true,
    cy: true,
    Cypress: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'jest', 'jest-dom', 'testing-library'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': 'error',
    'comma-dangle': 'off',
    camelcase: 'error',
    'class-methods-use-this': 'off',
    'import/no-named-as-default': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'func-names': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/setupTests.js',
          '**/test-utils/test-utils.js',
          'acceptance/cypress/**/*.js',
        ],
      },
    ],
    semi: [2, 'always'],
    'consistent-return': 'warn',
    'react/require-default-props': [1],
    'react/forbid-prop-types': [1],
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
  },
};
