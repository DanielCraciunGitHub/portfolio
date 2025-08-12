/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,jsx,ts,tsx,json,md,css,scss,yml,yaml,mjs}": [
    "eslint --fix",
    "prettier --write",
  ],
};

export default config;
