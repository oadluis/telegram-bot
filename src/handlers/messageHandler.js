const sendMainMenu = require('../menus/mainMenu');

module.exports = (bot) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
      sendMainMenu(bot, chatId);
    } else {
      bot.sendMessage(
        chatId,
        'Desculpe, não entendi sua mensagem. Use /start para começar'
      );
    }
  });
};
