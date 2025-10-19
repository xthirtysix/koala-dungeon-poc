import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'
import globals from 'globals'

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/html-indent': {
                indent: 4,
            },
        },
    },
)
