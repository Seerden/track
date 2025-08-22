// biome-ignore lint/style/noCommonJs: TODO: replace jest with vitest
const config = require("dotenv").config;

config({ path: "./.env" });
config({ path: "./test.env" });
