module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    'plugins': [
        'import',
    ],
    'parserOptions': {
        'sourceType': 'module',
    },
    'globals': {
        '__dirname': true,
    },
    'rules': {
        'comma-dangle': ['warn', 'always-multiline'],
        'eqeqeq': ['error', 'smart'],
        'indent': ['warn', 2],
        'linebreak-style': ['warn', 'unix'],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
    },
    'overrides': [
        {
            'files': 'src/intro.js',
            'globals': {
                'println': true,
            },
        }
    ],
};
