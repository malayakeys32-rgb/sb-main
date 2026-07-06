const { loadEnv } = require("./env");
const { connectDatabase } = require("./database");
const jwtConfig = require("./jwt");

async function initializeConfig() {
  loadEnv();
  await connectDatabase();
}

module.exports = {
  initializeConfig,
  jwtConfig
};
