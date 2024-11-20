/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: { node: true },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['**/vendor/*.js', '**/components/icons/*'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // crlf перенос строки
        //'linebreak-style': ['error', 'windows'],
        // контроль валидность ибъявления v-slot
        'vue/valid-v-slot': [0],
        // порядок объявления свойств в объекте компонента (props, data, methods, ...)
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'name',
                    'components',
                    'props',
                    'data',
                    'methods',
                    'watch',
                    'computed',
                    'LIFECYCLE_HOOKS',
                ],
            },
        ],
        /* отключим обязательность наличия более одного слова в наименовани компонента */
        'vue/multi-word-component-names': 0,
        /* точка с запятой обязательна за исключением последней точки с запятой в однострочном блоке */
        semi: ['error', 'always', { omitLastInOneLineBlock: true }],
        /* в JS только одинарные кавычки, для строчных литералов обратные кавычки разрешены */
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        /* пробелы в конце строки недопустимы */
        'no-trailing-spaces': ['error'],
        /* не допускается более 1 пустой строки подряд */
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        /* в конце файла обязательно должна быть одна пустая строка */
        'eol-last': ['error', 'always'],
        /* значения атрибутов тегов обязательно указывать в кавычках */
        'vue/html-quotes': ['error', 'double'],
        /* в тэге не более одного атрибута на строку */
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: { max: 1 },
                multiline: { max: 1 },
            },
        ],
        /* очередность атрибутов */
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'CONDITIONALS',
                    'LIST_RENDERING',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT',
                ],
                alphabetical: false,
            },
        ],

        // // отступы в JS = 4 символа
        // 'vue/script-indent': ['error', 4],
        // // отступы в HTML = 4 символа
        // 'vue/html-indent': ['error', 4],
        // самозакрытые теги недопустимы
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'never',
                },
            },
        ],
        // если несколько атрибутов, то первый атрибут тоже с новой строки
        'vue/first-attribute-linebreak': ['error'],
        // закрывающая скобка тэга не должна зависать на следующей строке
        'vue/html-closing-bracket-newline': ['error'],
        // в интерполяции между фигурными скобками и контентом обязателен пробел {{ name }}
        'vue/mustache-interpolation-spacing': ['error'],
        // контент однострочного элемента с новой строки
        // 'vue/singleline-html-element-content-newline': ['error'],
        // контент многострочного элемента начинается и заканчивается новой строкой
        'vue/multiline-html-element-content-newline': ['error'],

        // слоты через решетку (#), а не через 'v-slot:'
        'vue/v-slot-style': ['warn'],
        // баиндинг через двоеточие (:), а не через 'v-bind:'
        'vue/v-bind-style': ['warn'],
        // пропсы в тэге пишем через-дефис, а не кэмелКейсом
        'vue/attribute-hyphenation': ['error'],
    },
};
