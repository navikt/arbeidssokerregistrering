module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "no-extra-boolean-cast": "warn",
    "react-hooks/exhaustive-deps": "warn",
  },
};
