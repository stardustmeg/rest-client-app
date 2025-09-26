/**
 * @type {import('lint-staged').Config}
 */
const config = {
  '*': ['biome check --write --unsafe'],
};

export default config;
