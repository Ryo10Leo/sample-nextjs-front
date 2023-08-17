const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*spec.{ts,tsx}", "!**/node_modules/**"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(config);
