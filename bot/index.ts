const { Telegraf } = require("telegraf");
const { BOT_TOKEN } = require("./config");
const { help } = require("./commands/help");
const { start } = require("./commands/start");
const { webapp } = require("./commands/webapp");
const { updatePrices } = require("./commands/update-prices");

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(BOT_TOKEN);

bot.command("start", start);
bot.command("help", help);
bot.command("webapp", webapp);
bot.command("updatePrices", updatePrices);

bot.launch().then(() => {
  console.log("Bot is running...");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
