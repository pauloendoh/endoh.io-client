// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  modulePathIgnorePatterns: ["node_modules", "dist", "cypress"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
