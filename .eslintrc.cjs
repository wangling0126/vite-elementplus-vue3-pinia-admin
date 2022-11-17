module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    // "plugin:vue/essential",
    // node_modules\eslint-plugin-vue\lib\configs\vue3-recommended.js
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // 新增，必须放在最后面
    'plugin:prettier/recommended'
    // 'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    //  解决vue文件：Parsing error: '>' expected
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    // 解决ts any错误  Don't use `{}` as a type. `{}` actually means "any non-nullish value".
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/multi-word-component-names': 'off'
  }
}
