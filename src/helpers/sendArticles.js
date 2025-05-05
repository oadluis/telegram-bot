const formatMessage = require('./formatMessage');

module.exports = async (bot, chatId, articles) => {
  let hasError = false;
  let successCount = 0;

  for (const article of articles) {
    try {
      const { message, imageUrl } = formatMessage(article);

      // Lógica para mandar o arquivo com foto ou sem dependendo das condições.
      if (imageUrl) {
        await bot.sendPhoto(chatId, imageUrl, {
          caption: message,
          parse_mode: 'Markdown',
        });
      } else {
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
      successCount++;
    } catch (error) {
      console.error('Erro ao enviar artigo:', error);
      hasError = true;
    }
  }

  // Só mostra mensagem de erro se nenhum artigo foi enviado com sucesso
  if (hasError && successCount === 0) {
    bot.sendMessage(
      chatId,
      '❌ Ocorreu um erro ao enviar as notícias. Por favor, tente novamente.'
    );
  }
};
