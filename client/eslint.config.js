import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";

export default [
  js.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        CustomEvent: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
