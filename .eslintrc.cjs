module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@astro/parser/eslint-plugin',
  extends: [
    'plugin:astro/jsx-a11y-recommended',
    'plugin:astro/recommended',
    'airbnb-base',
    'prettier'
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'none', semi: false }
    ],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'never'],
    'no-tabs': ['error', { allowIndentationTabs: true }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
