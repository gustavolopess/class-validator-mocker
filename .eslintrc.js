module.exports = {
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    "plugins": ["jest", "@typescript-eslint"],
    "ignorePatterns": ["jest.config.js", ".eslintrc.js"],
    "parserOptions": {
      "ecmaVersion": 2018
    },
    "rules": {
      "@typescript-eslint/ban-types": "off",
    },
    "overrides": [
      {
        "files": ["**/*.spec.ts"],
        "extends": ["plugin:jest/recommended"],
        "env": {
          "jest": true
        },
        "rules": {
          "jest/consistent-test-it": "error"
        }
      }
    ]
  }