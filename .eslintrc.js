module.exports = {
    root: true,
    env: {
      node: true,
      jest: true,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:security-node/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  }
  