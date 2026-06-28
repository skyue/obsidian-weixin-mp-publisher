import noUnsanitized from "eslint-plugin-no-unsanitized";

export default [
  {
    files: ["main.js"],
    plugins: { "no-unsanitized": noUnsanitized },
    rules: {
      "no-unsanitized/method": "warn",
      "no-unsanitized/property": "warn",
    },
  },
];
