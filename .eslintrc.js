module.exports = {
  root: true,
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js", "jest.config.js", "next.config.js"],
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "next/core-web-vitals", "prettier"],
  plugins: ["@typescript-eslint/eslint-plugin"],
};
