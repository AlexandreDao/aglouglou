// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: [
    'expo',
    'plugin:react-native/all',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@tanstack/query/recommended',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint', 'jest', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
  overrides: [
    {
      files: ['*.test.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      alias: {
        map: [['@', './src']], // Define the alias explicitly
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.tsx', '.ios.tsx'],
      },
    },
  },
}
