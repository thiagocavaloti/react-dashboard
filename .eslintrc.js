module.exports = {
  "root": true,
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [
      "airbnb-base",
      "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
    "no-wildcard-postmessage",
    "no-unsanitized",
    "security",
    "scanjs-rules",
    "react"
  ],
  "rules": {
    "class-methods-use-this": "off",
    "comma-dangle": ["error", "never"],
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "no-param-reassign": 0,
    "no-alert": 0
  }
};