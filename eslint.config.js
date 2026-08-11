import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vuePlugin from 'eslint-plugin-vue'
import nuxtPlugin from '@nuxt/eslint'

export default [
  js.configs.recommended,

  ...vuePlugin.configs['flat/recommended'],

  ...tseslint.configs.recommended,

  ...nuxtPlugin.default,

  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  },
]
