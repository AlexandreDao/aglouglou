// https://docs.expo.dev/guides/using-eslint/

const { defineConfig } = require('eslint/config')
const globals = require('globals')

const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const importPlugin = require('eslint-plugin-import')

module.exports = defineConfig([
  {
    ignores: [
      // Expo
      '.expo',
      'expo-env.d.ts',
      'app-example',
      // pnpm
      'package.json',
      'pnpm-lock.yaml',
      'node_modules',
      // Native modules
      'assets/**',
      'ios/**',
      'android/**',
      // IDE
      '.vscode',
      // Config
      'eslint.config.js',
      'tsconfig.json',
      'app.json',
      'eas.json',
      'jestSetup.js',
      // Build
      '/dist/*',
      // Tests
      'e2e/**',
      'coverage/',
      // Scripts
      'scripts/**',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  expoConfig,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'react-native/no-inline-styles': 'off',
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
  },
])
