const { messages } = require('../utils/constants');

module.exports = (bot) => {
  bot.on('message', async (msg) => {
    try {
      const chatId = msg.chat.id;
      const text = msg.text;

      // Ignora mensagens que não são texto
      if (!text) return;

      // Ignora comandos (mensagens que começam com /)
      if (text.startsWith('/')) return;

      // Responde a mensagens de texto com uma mensagem padrão
      bot.sendMessage(
        chatId,
        'Olá! Para começar a usar o bot, use o comando /start para ver o menu principal.'
      );
    } catch (error) {
      console.error('Erro no message handler:', error);
      bot.sendMessage(
        msg.chat.id,
        'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      );
    }
  });
}; 