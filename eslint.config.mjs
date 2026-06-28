import noUnsanitized from "eslint-plugin-no-unsanitized";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["main.js"],
    plugins: { "no-unsanitized": noUnsanitized },
    rules: {
      "no-unsanitized/method": "warn",
      "no-unsanitized/property": "warn",
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.ts", "packages/**/*.ts"],
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": "off",
    },
  })),
];
