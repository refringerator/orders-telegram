const { WEBAPP_URL } = require("../config");

const command = (ctx: any) => {
  const chatId = ctx.chat.id;
  // Encode le chatId en base64
  const encodedGroupId = Buffer.from(chatId.toString()).toString("base64");
  console.log("Chat ID:", chatId);
  console.log("Encoded Group ID:", encodedGroupId);
  ctx.reply("Веб-приложение", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть приложение заказов",
            url: `${WEBAPP_URL}?startapp=${encodedGroupId}`,
          },
        ],
      ],
    },
  });
};

module.exports = {
  webapp: command,
};
