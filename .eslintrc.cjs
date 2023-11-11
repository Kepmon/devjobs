module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'eslint:recommended',
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
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'never'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-param-reassign': ['error', { props: false }],
    'import/order': [
      'error',
      {
        groups: [
          'object',
          'index',
          'type',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'external'
        ]
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
