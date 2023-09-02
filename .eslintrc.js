module.exports = {
  root: true,
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js", "jest.config.js", "next.config.js"],
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
