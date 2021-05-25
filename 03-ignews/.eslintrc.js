module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    camelcase: 'off',
    'no-case-declarations': 'off',
  },
}
