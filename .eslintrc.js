module.exports = {
  "env": {
      "es6": true,
      "node": true,
      "mocha": true,
      "jasmine": true,
      "browser": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:testing-library/recommended",
      "plugin:testing-library/react",
      "plugin:jest-dom/recommended"
    ],
  "plugins": [
      "testing-library",
      "jest-dom"
  ],
  "globals": {
      "jest": true,
      "document": true,
      "browser": true,
      "driver": true,
      "cy": true,
      "Cypress": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "sourceType": "module"
  },
  "rules": {
      "max-len": [
          "warn",
          {
              "code": 120,
              "ignoreStrings": true,
              "ignoreRegExpLiterals": true
          }
      ],
      "react/jsx-indent": [
          "error",
          2
      ],
      "react/jsx-indent-props": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-console": "off",
      "strict": "warn",
      "curly": "off",
      "arrow-parens": ["error", "always"],
      "camelcase": "error",
      "no-var": "error",
      "react/jsx-filename-extension": "off",
      "react/no-did-mount-set-state": "off",
      "comma-dangle": "off",
      "class-methods-use-this": ["off"],
      "import/no-named-as-default": ["off"],
      "no-underscore-dangle": "off",
      "function-paren-newline": ["error", "consistent"],
      "testing-library/await-async-query": "off",
      "testing-library/no-await-sync-query": "error",
      "testing-library/no-debug": "warn"
  },
  "settings": {
      "react": {
          "version": "detect"
      },
      "import/resolver": {
          "node": {
              "moduleDirectory": [
                  "node_modules",
                  "src"
              ]
          }
      }
  }
};
