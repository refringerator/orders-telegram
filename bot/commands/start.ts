const command_start = (ctx: any) => {
  ctx.reply(
    "Добро пожаловать в бот заказов! 🚀\nВведите /help для просмотра всех доступных команд."
  );
};

module.exports = {
  start: command_start,
};
