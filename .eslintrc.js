// https://docs.expo.dev/guides/using-eslint/
import pluginQuery from '@tanstack/eslint-plugin-query'

module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    ...pluginQuery.configs['flat/recommended'],
    'prettier/prettier': 'error'
  }
}
