module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'semi': 0,
    'arrow-parens': 0,
    'handle-callback-err': 0,
    'space-before-function-paren': 0,
    'no-useless-call': 0,
    'no-new': 0,
    'new-cap': 0,
    'no-extra-boolean-cast': 0,
    'eqeqeq': 0,
    'operator-linebreak': 0,
    'one-var': 0,
    'no-unused-vars': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'env': {
    'browser': true,
    'node': true
  }
}
