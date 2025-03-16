const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  WEBAPP_URL: process.env.WEBAPP_URL,
  EXCEL_ID: process.env.EXCEL_ID,
  GOOGLE_CREDS: path.resolve(__dirname, "../creds/credentials.json"),
};
