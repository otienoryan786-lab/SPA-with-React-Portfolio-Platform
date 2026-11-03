module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  testMatch: ["<rootDir>/src/tests/**/*.test.jsx"],
};
