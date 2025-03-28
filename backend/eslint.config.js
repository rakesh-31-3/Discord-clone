import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import google from "eslint-config-google";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: { js },
    extends: [
      js.configs.recommended,
      {
        ...google,
        rules: {
          ...google.rules,
          "require-jsdoc": "off",
          "valid-jsdoc": "off",
        },
      },
    ],
    rules: {
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "max-len": ["error", { code: 100 }],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
      "eol-last": ["error", "always"],
    },
  },
]);
