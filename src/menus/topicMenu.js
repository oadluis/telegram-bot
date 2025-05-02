function sendTopicMenu(bot, chatId, data) {
  const topicosOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Tecnologia 💻', callback_data: `section_tech` },
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
    'Escolha uma seção para explorar os tópicos:',
    sectionOptions
  );
}

module.exports = sendTopicMenu;
