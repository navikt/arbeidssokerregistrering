module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
    cache: false,
  },

  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
