module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
       "ecmaVersion": 6,
       "sourceType": "module"
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    //extends: 'standard',
    // required to lint *.vue files
    plugins: [
      'html'
    ],
    "rules": {
    }
}
