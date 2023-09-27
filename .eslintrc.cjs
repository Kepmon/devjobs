module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'eslint:recommended',
    'airbnb-base',
  ],
  overrides: [
    {
      env: {
        node: true,
        "astro/astro": true,
        es2020: true,
      },
      files: ['*.astro', '*.ts'],
      plugins: ["astro"],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: "module"
      },
      rules: {
        'astro/prefer-class-list-directive': 'error',
        'astro/no-unused-css-selector': 'error',
      }
    },
    {
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
        sourceType: "module",
      }
    }
  ]
}