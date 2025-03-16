const command_help = (ctx: any) => {
  ctx.reply(
    "Доступные команды:\n" +
      "/start - Начать использовать бота\n" +
      "/help - Показать это справочное сообщение\n" +
      "/webapp - Открыть веб-приложение заказов"
  );
};

module.exports = {
  help: command_help,
};
