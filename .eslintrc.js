module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: 'babel-eslint'
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential',
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {        "arrow-parens": [2, "as-needed"],
    "indent": [2, 4, { "SwitchCase": 1, "VariableDeclarator": 2 }],
    "quotes": [2, "double"],
    "semi": [2, "always"],
    "object-curly-spacing": [2, "always"],
    "arrow-spacing": [2, { "before": true, "after": true }]}
  }
  