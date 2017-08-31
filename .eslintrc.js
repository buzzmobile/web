module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        "arrow-parens": [2, "as-needed"],
        "indent": [2, 4, { "SwitchCase": 1, "VariableDeclarator": 2 }],
        "quotes": [2, "double"],
        "semi": [2, "always"],
        "object-curly-spacing": [2, "always"],
        "arrow-spacing": [2, { "before": true, "after": true }]
    },
    globals: {}
}
