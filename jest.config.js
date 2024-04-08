module.exports = {
 clearMocks: true,
 collectCoverage: true,
 coverageDirectory: "coverage",
 moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
 // setupFilesAfterEnv: ["./jest.setup.js"], 
 testEnvironment: "node",
 testLocationInResults: true,
 testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
 testPathIgnorePatterns: ["\\\\node_modules\\\\"],
 verbose: true,
};
