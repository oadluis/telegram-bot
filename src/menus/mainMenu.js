//* Função para enviar o menu inicial
function sendMainMenu(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Notícias de Hoje', callback_data: 'noticias_hoje' }],
        [{ text: 'Notícias da Semana', callback_data: 'noticias_semana' }],
        [{ text: 'Notícias do Mês', callback_data: 'noticias_mes' }],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Bem vindo ao NewsTodayBR! Você pode me perguntar sobre as últimas notícias do Brasil e do mundo. O que você gostaria de saber?',
    options
  );
}

module.exports = sendMainMenu;
