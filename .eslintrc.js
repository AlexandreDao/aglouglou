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
  },
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
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
}
