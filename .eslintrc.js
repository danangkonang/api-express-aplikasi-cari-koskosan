module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'max-len': ['error', { comments: 200, code: 100 }],
  },
};

// module.exports = {
//   env: {
//     es6: true,
//     node: true
//   },
//   extends: ['airbnb-base', 'prettier'],
//   plugins: ['prettier'],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly'
//   },
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module'
//   },
//   rules: {
//     'prettier/prettier': 'error',
//     'class-methods-use-this': 'off',
//     'no-param-reassign': 'off',
//     camelcase: 'off',
//     'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
//   }
// };
