module.exports = {
  root: true,
  "env": {
    "browser": true,
    "amd": true,
    "node": true
},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    "decorators-legacy"
  ],

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}