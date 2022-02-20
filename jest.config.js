module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    "moduleNameMapper": {
        "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.spec.tsx",
        "!src/**/_app.tsx",
        "!src/**/_documento.tsx"
    ],
    coverageReporters: ['lcov', 'json']
};