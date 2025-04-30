function sendTopicMenu(bot, chatId, data) {
  const topicosOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Tecnologia 💻', callback_data: `${data}_tech` },
          { text: 'Agropecuária 🪴', callback_data: `${data}_agro` },
        ],
        [
          { text: 'Economia 🤑', callback_data: `${data}_economia` },
          { text: 'Política 🔈', callback_data: `${data}_politica` },
        ],
        [
          { text: 'Esportes ⚽', callback_data: `${data}_esportes` },
          { text: 'Ciência 🧪', callback_data: `${data}_ciencia` },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Escolha um tópico para ver as notícias mais relevantes',
    topicosOptions
  );
}

module.exports = sendTopicMenu;
