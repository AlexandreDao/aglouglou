// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  extends: ['expo', 'plugin:@tanstack/query/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
